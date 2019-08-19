module.exports.getTime = () => {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ampm = "AM";
  
  if (hh > 12) {
    hh = hh - 12;
    ampm = "PM";
  }
  
  if (hh == 24) {
    hh = 00;
    ampm = "AM";
  }  
  
  let time = hh + ":" + mm + " " + ampm;
  return time;
}
