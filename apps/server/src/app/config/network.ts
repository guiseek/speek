const download = process.env.DOWNLOAD_HOST ?? ''

const upload = {
  hostname: process.env.UPLOAD_HOST ?? '',
  path: process.env.UPLOAD_PATH ?? '',
  port: process.env.UPLOAD_PORT ?? '',
  method: process.env.UPLOAD_METHOD ?? '',
  headers: { 'Content-Type': 'application/json' },
}

export { download, upload }
