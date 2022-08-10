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
   let filearray = [];
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

// Start of Elapsed time
export const getElapsedTime = (time) => {
   // Record end time
   let endTime = new Date();
   let startTime = new Date(time);
   // Compute time difference in milliseconds
   let timeDiff = endTime.getTime() - startTime.getTime();
   // Convert time difference from milliseconds to seconds
   timeDiff = timeDiff / 1000;
   // Extract integer seconds that do not form a minute using %
   let seconds = Math.floor(timeDiff % 60);
   // Pad seconds with a zero (if necessary) and convert to string
   let secondsAsString = seconds;
   // Convert time difference from seconds to minutes using %
   timeDiff = Math.floor(timeDiff / 60);
   // Extract integer minutes that don't form an hour using %
   let minutes = timeDiff % 60;
   // Pad minutes with a zero (if necessary) and convert to string
   let minuteAsString = minutes;
   // Convert time difference from minutes to hours
   timeDiff = Math.floor(timeDiff / 60);
   // Extract integer hours that don't form a day using %
   let hours = timeDiff % 24;
   // Convert time difference from hours to day
   timeDiff = Math.floor(timeDiff / 24);
   // The rest of timeDiff is number of days
   let days = timeDiff;
   let totalHours = hours + days * 24; // add days to hours
   // Pad hours with a zero (if necessary) and convert to string
   let totalHoursAsString = totalHours;
   // return secondsAsString

   let month = startTime.toLocaleString("default", { month: "long" });
   let day = startTime.toLocaleString("default", { day: "numeric" });
   let yr = startTime.toLocaleString("default", { year: "numeric" });
   let hr = startTime.toLocaleString("default", { hour: "numeric" });
   let min = startTime.toLocaleString("default", { minute: "2-digit" });
   let sec = startTime.toLocaleString("default", { second: "2-digit" });

   if (
      days <= 0 &&
      secondsAsString <= 59 &&
      minuteAsString <= 0 &&
      totalHoursAsString <= 0
   ) {
      return "Just now.";
   } else if (
      days <= 0 &&
      secondsAsString <= 59 &&
      minuteAsString <= 59 &&
      totalHoursAsString <= 0
   ) {
      return minuteAsString == 1
         ? `${minuteAsString} minute ago`
         : `${minuteAsString} minutes ago`;
   } else if (
      days <= 0 &&
      secondsAsString <= 59 &&
      minuteAsString <= 59 &&
      totalHoursAsString <= 59
   ) {
      return totalHoursAsString == 1
         ? `${totalHoursAsString} hour ago`
         : `${totalHoursAsString} hours ago`;
   } else if (days == 1) {
      return "1 day ago";
   } else {
      return month + " " + day + ", " + yr + " " + hr;
   }
};

export const getFileExtension = (filename) => {
   let name = filename.split(".").pop();

   if (name === "pdf") {
      return "bxs-file-pdf";
   } else if (name === "docx") {
      return "bxs-file-doc";
   } else if (name === "pptx") {
      return "bxs-file";
   } else {
      return "";
   }
};
