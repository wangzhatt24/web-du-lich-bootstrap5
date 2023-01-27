const tourId = document.getElementById("tourId");
const tour = document.getElementById("tour");
const tourDay = document.getElementById("tourDay");
const tourTime = document.getElementById("tourTime");
const tourPrice = document.getElementById("tourPrice");
const coverImage = document.getElementById("coverImage");
const saveBtn = document.getElementById("saveBtn");
const reset = document.getElementById("reset");
const cancelBtn = document.getElementById("cancelBtn");
const timer = document.getElementById("timer");
const validateMessage = document.getElementById("validateMessage");
const tbodyRef = document
  .getElementById("table")
  .getElementsByTagName("tbody")[0];

const checkTourId = () => {
  const re = /^[A-Z]{2}\d{1}-\d{4}$/;
  const tourIdHelper = document.getElementById("tourIdHelper");

  if (tourId.value == "") {
    tourIdHelper.textContent = "* bắt buộc nhập";
    return false;
  } else {
    const ok = re.test(tourId.value.trim());

    if (ok) {
      tourIdHelper.textContent = "*";
      return true;
    } else {
      tourIdHelper.textContent =
        "* Mã tour là XXY-YYYY: X là chữ hoa, Y là ký tự số";
      return false;
    }
  }
};
const checkTourDay = () => {
  const tourDayHelper = document.getElementById("tourDayHelper");

  const today = new Date();
  const sevenDayMore = new Date();
  sevenDayMore.setDate(today.getDate() + 7);
  const tourDayDate = new Date(tourDay.value);

  if (tourDay.value == "") {
    tourDayHelper.textContent = "* bắt buộc";
    return false;
  } else {
    if (tourDayDate > sevenDayMore) {
      tourDayHelper.textContent = "*";
      return true;
    } else {
      tourDayHelper.textContent =
        "* ngày khởi hành phải sau ngày hiện tại 7 ngày";
      return false;
    }
  }
};
const checkTourPrice = () => {
  const tourPriceHelper = document.getElementById("tourPriceHelper");

  if (parseInt(tourPrice.value) < 0) {
    tourPriceHelper.textContent = "* phải lớn hơn 0";
    return false;
  } else {
    tourPriceHelper.textContent = "*";
    return true;
  }
};
const checkCoverImage = (e) => {
  const coverImageHelper = document.getElementById("coverImageHelper");

  if (e.target.value == "") {
    coverImageHelper.textContent = "* vui lòng chọn ảnh";
    return false;
  } else {
    coverImageHelper.textContent = "*";
    return true;
  }
};
const checkAll = () => {
  if (checkTourDay() && checkTourId && checkTourPrice && checkCoverImage) {
    return true;
  } else {
    return false;
  }
};
const handleReset = () => {
  reset.click();
};
let stt = 1;
const handleSave = () => {
  if (checkAll()) {
    tbodyRef.innerHTML += `<tr>
              <td scope="col">${stt}</td>
              <td scope="col">${tourId.value}</td>
              <td scope="col">${tour.value}</td>
              <td scope="col">${tourDay.value}</td>
              <td scope="col">${tourTime.value}</td>
              <td scope="col">${tourPrice.value}</td>
              <td scope="col">${coverImage.value.replace(/^.*[\\\/]/, "")}</td>
            </tr>`;
    stt++;
  } else {
    // Mục đích cho việc cuộn lên trên đầu modal và show note này nhưng chưa được
    validateMessage.textContent = "Vui lòng nhập đúng và đủ thông tin!";
    validateMessage.click();
  }
};
const time = () => {
  const now = new Date();
  let textTime = `${now.getHours()} giờ : ${now.getMinutes()} phút : ${now.getSeconds()} giây`;
  return textTime;
};
const timerHandle = () => {
  timer.textContent = time();
  setInterval(() => {
    timer.textContent = time();
  }, 1000);
};

timerHandle();
tourDay.onblur = checkTourDay;
tourId.onblur = checkTourId;
tourPrice.onblur = checkTourPrice;
coverImage.onchange = checkCoverImage;
cancelBtn.onclick = handleReset;
saveBtn.onclick = handleSave;
