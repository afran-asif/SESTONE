import { createUploadthing, type FileRouter  } from "uploadthing/next";

const f = createUploadthing();

export const OurFileRouter = {
    imageUploader: f({
        image: {maxFileSize: "4MB", maxFileCount: 6}
    })
    .onUploadComplete(async ({ file }) => {
        console.log("Upload complete for url:", file.url);
        return {url: file.url};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof OurFileRouter