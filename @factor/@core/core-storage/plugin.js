const loadImage = require("blueimp-load-image")

module.exports.default = Factor => {
  return new (class {
    constructor() {
      Factor.$stack.register({
        id: `storage-service-upload`,
        title: "Storage - Upload File",
        description: "Uploads a file to storage.",
        args:
          "Object { data (metadata), path (storage path), file (the file), change: (upload) => {}, error: (error) => {} , done: (url) => {} }",
        result: "[Use Callbacks]"
      })

      Factor.$stack.register({
        id: `storage-service-delete`,
        title: "Storage - Delete File",
        description: "Deletes a file based on its path",
        args: "Object { path }",
        result: "Boolean"
      })
    }

    createPath(path, vars) {
      path = path.replace("__guid", vars.guid)
      path = path.replace("__uid", vars.uid)
      path = path.replace("__name", vars.name)
      path = path.replace("__ext", vars.ext)
      path = path.replace("__month", Factor.$time.iMonth())

      return path
    }

    async dataURL(file) {
      const reader = new FileReader()

      return new Promise((resolve, reject) => {
        reader.addEventListener("load", function(e) {
          resolve(e.target.result)
        })

        reader.readAsDataURL(file)
      })
    }

    // ENDPOINT
    async request({ method, args }) {
      const served = await Factor.$stack.service(`storage-service-${method}`, args)

      return served ? served.result : false
    }

    async delete(args) {
      return await this.request({ method: "delete", args })
    }

    async upload(args) {
      args.file = await this.preupload(args)

      args.metadata = {
        uid: args.uid || Factor.$user.uid()
      }

      this.request({
        method: "upload",
        args
      })

      return
    }

    async preupload(args) {
      let { file, resize = true, maxWidth = 2000, maxHeight = 2000, preprocess } = args

      preprocess({
        mode: "started",
        percent: 5
      })

      if (resize && args.file.type.includes("image")) {
        file = await new Promise(resolve => {
          loadImage(
            file,
            canvas => {
              canvas.toBlob(blob => resolve(blob), "image/jpeg")
            },
            { maxWidth, maxHeight, canvas: true, orientation: true }
          )
        })
        preprocess.call(this, {
          mode: "resized",
          percent: 25,
          preview: URL.createObjectURL(file)
        })
      }

      preprocess({
        mode: "finished",
        percent: 100
      })

      return file
    }
  })()
}
