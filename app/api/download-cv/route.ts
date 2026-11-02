import { promises as fs } from "fs"
import path from "path"

const SOURCE_PATH = path.join(process.cwd(), "public", "English cv of Abderrahmane Er-Raqabi.pdf")
const DOWNLOAD_NAME = "Abderrahmane_Er-Raqabi_CV_English.pdf"

const CONTENT_TYPE_BY_EXTENSION: Record<string, string> = {
  ".pdf": "application/pdf",
}

export const runtime = "nodejs"

export async function GET() {
  try {
      const file = await fs.readFile(SOURCE_PATH)

      const extension = path.extname(SOURCE_PATH).toLowerCase()
      const contentType = CONTENT_TYPE_BY_EXTENSION[extension] ?? "application/octet-stream"

      return new Response(file, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${DOWNLOAD_NAME}"`,
          "Content-Length": String(file.length),
          "Cache-Control": "no-store",
        },
      })
  } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        console.error(`Failed to read CV at ${SOURCE_PATH}`, error)
        return new Response("Unable to load CV file.", { status: 500 })
      }
  }

  return new Response("CV not found. Please add the updated English PDF to public.", {
    status: 404,
  })
}
