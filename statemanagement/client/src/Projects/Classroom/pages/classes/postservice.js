export const getVideoEmbedURL = (content) => {
   let replacePattern1 =
      /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
   let replacedText = content.replace(replacePattern1, "<*>$1<*>");
   let content_arr = replacedText.split("<*>");
   let a = [];

   a = content_arr.filter((x) => {
      if (x.includes("http")) {
         return x;
      }
   });

   for (let i = 0; i < a.length; i++) {
      if (a[i].includes("youtube.com")) {
         a[i] = a[i].replace("watch?v=", "embed/");
      } else {
         a[i] = a[i].replace("view?usp=sharing", "preview");
      }
      // a[i] = this.sanitizer.bypassSecurityTrustResourceUrl(a[i]);
   }

   return a;
};

export const splitFilestring = (filestring) => {
   let arr1 = filestring.split(":");
   let filearray = [
      {
         name: "",
         link: "",
         path: "",
      },
   ];
   for (let i = 0; i < arr1.length; i++) {
      let arr2 = arr1[i].split("?");
      filearray.push({
         name: arr2[0],
         link: "localhost" + arr2[1],
         path: arr2[1],
      });
   }
   return filearray;
};

export const includefiles = (array) => {
   array.forEach((el) => {
      el.attachment_fld = [];
      el.images_fld = [];
      el.embedvideo_fld = [];
      el.uploadvideo_fld = [];
      el.attachment_fld = [];
      el.poll_fld = [];
      el.pollchoices_fld = [];
      el.pollresponse_fld = [];

      if (el.dir_fld) {
         let files = splitFilestring(el.dir_fld);
         files.forEach((f) => {
            if (
               f.path.includes("gif") ||
               f.path.includes("jpeg") ||
               f.path.includes("jpg") ||
               f.path.includes("png") ||
               f.path.includes("bmp")
            ) {
               el.images_fld.push(f);
            }
            if (
               f.path.includes("mp4") ||
               f.path.includes("m4v") ||
               f.path.includes("avi") ||
               f.path.includes("mpg") ||
               f.path.includes("wmv")
            ) {
               el.uploadvideo_fld.push(f);
            }
            if (
               f.path.includes("doc") ||
               f.path.includes("docx") ||
               f.path.includes("html") ||
               f.path.includes("htm") ||
               f.path.includes("pdf") ||
               f.path.includes("xls") ||
               f.path.includes("xlsx") ||
               f.path.includes("ods") ||
               f.path.includes("csv") ||
               f.path.includes("ppt") ||
               f.path.includes("pptx") ||
               f.path.includes("txt")
            ) {
               el.attachment_fld.push(f);
            }
         });
      }

      if (el.content_fld.includes("youtube.com")) {
         el.embedvideo_fld = getVideoEmbedURL(el.content_fld);
      }
   });

   return array;
};
