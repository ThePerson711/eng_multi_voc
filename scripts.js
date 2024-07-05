
const move_list = document.getElementById("move_list");
const inp = {
  kr: {
    word: document.getElementById("inp_kr_word"),
    des: document.getElementById("inp_kr_des")
  },
  uz: {
    word: document.getElementById("inp_uz_word"),
    des: document.getElementById("inp_uz_des")
  }
}
const re_inp = {
  kr: {
    word: document.getElementById("re_inp_kr_word"),
    des: document.getElementById("re_inp_kr_des")
  },
  uz: {
    word: document.getElementById("re_inp_uz_word"),
    des: document.getElementById("re_inp_uz_des")
  }
}
const words_list = document.getElementById("words_show_list");
let words = [];
let ar_FT = []
let test_option = {
  lang: "kr-to-uz",
  num: 10,
  date: "today"
};
let test = {
  ask: document.getElementById("test_ask"),
  check: document.getElementById("test_check")
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let CurentNumOfTest = 0;
let CurTest = {
  true: 0,
  false: 0,
  num: 0
}
let CurentSelectedWord = 0;
let NumOfList = 7;
let test_with_option;
let CurentTestNth;
let option = [];
let ques_id;
let RightAnswerForOptions;
let AboutPage = {
  Creator: "AkbarShoh_711",
  data: "29/06/2024",
  versin: 1.01,
  about: "For learn new words in english"
}
console.log(AboutPage);

if (localStorage.getItem("ENG_VOC_MY_ffLS") !== null) {
  words = JSON.parse(localStorage.getItem("ENG_VOC_MY_ffLS"));
}

/*
for (let i = 1; i <= 22; i++) {
  words.push({
    kr_word: `kr${i}`,
    kr_des: "",
    uz_word: `uz${i}`,
    uz_des: "",
    date: `2024-05-${i}T12:00:00`,
    tested: []
  })
};
SetDataToLS();*/

Menu("words");


//ClickedWord(45);
//console.table(words[45-1].tested)
test.ask.style.visibility = "visible";
test.check.style.visibility = "hidden";
//StartTest();
//ClickedWord(1);

TextToSpeech("", "en");

// ????????????????????????
//document.getElementById("test_select_type_test").click();
//StartTest();

//
function ReturnIndFa(ind_, obj_) {
  answer_ = {ind: ind_, fa: 0};
    fa_FT = 0;
    num_of_tested = 0;
    obj_.tested.forEach(elem => {
      num_of_tested++;
      if (elem.result !== true) {
        fa_FT++;
      }
    });
    answer_.fa = fa_FT / num_of_tested;
  return answer_;
}

//
function StartTest() {
  if (document.getElementById("test_select_type_card").checked) {
    if (document.getElementById("test_select_lang_kr_to_uz").checked) {
      test_option.lang = "kr-to-uz";
    } else if (document.getElementById("test_select_lang_uz_to_kr").checked) {
      test_option.lang = "uz-to-kr";
    }
    if (document.getElementById("test_select_date_today").checked) {
      test_option.date = "today";
    } else if (document.getElementById("test_select_date_week").checked) {
      test_option.date = "week";
    } else if (document.getElementById("test_select_date_all").checked) {
      test_option.date = "all";
    }
    test_option.num = (document.getElementById("test_select_num").value)
    move_list.style = `transform: translate(-${4*100/NumOfList}%, 0);`;
    CurentNumOfTest = 0;
    CurTest.num = 0;
    CurTest.true = 0;
    CurTest.false = 0;
    ar_FT = [];
    for (let i = 0; i < words.length; i++) {
      if (test_option.date === "today") {
        if ( daysPassedSince(words[i].date) <= 0) {
          ar_FT.push(ReturnIndFa(i,words[i]));
        }
      } else if (test_option.date === "week") {
        if ( daysPassedSince(words[i].date) <= 6) {
          ar_FT.push(ReturnIndFa(i,words[i]));
        }
      } else {
        ar_FT.push(ReturnIndFa(i,words[i]))
      }
    }
    NewTest();
  }
  if (document.getElementById("test_select_type_test").checked) {
    //
    move_list.style = `transform: translate(-${5*100/NumOfList}%, 0);`;
    test_with_option = {
      num_of_test: (document.getElementById("test_select_num").value),
      test_lang: (document.getElementById("test_select_lang_kr_to_uz").checked)?("kr-to-uz"):("uz-to-kr"),
      test_period: (document.getElementById("test_select_date_today").checked)?("today"):
            ((document.getElementById("test_select_date_week").checked)?("week"):
            (((document.getElementById("test_select_date_all").checked)?("all"):("error")))),
      ArrayOfCertainWords: SortArray(words, (document.getElementById("test_select_date_today").checked)?("today"):
            ((document.getElementById("test_select_date_week").checked)?("week"):
            (((document.getElementById("test_select_date_all").checked)?("all"):("error")))))
    };
    TestTestBegin();
  }
}
//
function SortArray(array_, period_) {
  answer = [];
  for (let i = 0; i < array_.length; i++) {
    element = array_[i];
    if (  (period_ === "today" && daysPassedSince(element.date) <= 0) ||
          (period_ === "week" && daysPassedSince(element.date) <= 6) ||
          (period_ === "all" && true)   ) {
            element.id = i;
      answer.push(element);
    }
  }
  return answer;
}
//
function TestTestBegin() {
  for (let i = 1; i<=4; i++) {
    document.getElementById(`test_option_${i}`).disabled = false;
    document.getElementById(`test_option_${i}`).style =  "background-color: rgb(154, 101, 187);";
  }
  params = test_with_option;
  //for (let CurentNumOfTest = 1; CurentNumOfTest <= params.num_of_test; CurentNumOfTest++) {
  f();
  function f() { 

    if (params.ArrayOfCertainWords.length >= 4) {
      //CurentTestNth = Math.floor(Math.random()*params.ArrayOfCertainWords.length);
      
      object_for_time = [];
      params.ArrayOfCertainWords.forEach(element => {
        fa_FT = 0;
        num_of_tested = 0;
        element.tested.forEach(elem => {
          num_of_tested++;
          if (elem.result !== true) {
            fa_FT++;
          }
        });
        fa_FT = fa_FT / num_of_tested;
        object_for_time.push(
          {
            ind: element.id,
            fa: fa_FT
          }
        );
      });
      CurentTestNth = SelectRand(object_for_time);

      ques_id = params.ArrayOfCertainWords[CurentTestNth].id;
      CurentSelectedWord = ques_id;
      option = [-1,-1,-1,-1];
      RightAnswerForOptions = Math.floor(Math.random()*4);
      option[RightAnswerForOptions] = CurentTestNth;
      for (let i = 0; i < 4; i++ ) {
        if (option[i] === -1) {
          option[i] = Math.floor(Math.random()*params.ArrayOfCertainWords.length)
          while (option[i] === CurentTestNth 
            || (option[i] === option[0] && i !== 0)
            || (option[i] === option[1] && i !== 1)
            || (option[i] === option[2] && i !== 2)
            || (option[i] === option[3] && i !== 3) ) {
            option[i] = Math.floor(Math.random()*params.ArrayOfCertainWords.length)
          }
        }
      }
      document.getElementById("test_question").innerHTML = (params.test_lang === "kr-to-uz")?(params.ArrayOfCertainWords[CurentTestNth].kr_word):(params.ArrayOfCertainWords[CurentTestNth].uz_word)
      for (let i = 1; i <= 4; i++) {
        document.getElementById(`test_option_${i}`).innerHTML = 
          (params.test_lang === "kr-to-uz")?(params.ArrayOfCertainWords[option[i-1]].uz_word):(params.ArrayOfCertainWords[option[i-1]].kr_word)
      }
    } 
  }

}
//
function TestOptionSelected(option_) {
  if (option_ === RightAnswerForOptions+1) {
    document.getElementById(`test_option_${option_}`).style = "background-color: greenyellow;";
    words[ques_id].tested.push({
      date: getCurrentDateTime(),
      result: true
    })
  } else {
    document.getElementById(`test_option_${option_}`).style = "background-color: rgb(219, 52, 52);";
    
    document.getElementById(`test_option_${RightAnswerForOptions+1}`).style = "background-color: greenyellow;";    
    words[ques_id].tested.push({
      date: getCurrentDateTime(),
      result: false
    })
  }
  SetDataToLS();
  for (let i = 1; i<=4; i++) {
    document.getElementById(`test_option_${i}`).disabled = true;
  }
  setTimeout(() => {
    TestTestBegin();
  }, 1250);
}
//
function NewTest() {
  CurentNumOfTest++;
  CurTest.num++;
  if (CurentNumOfTest > test_option.num) {
    alert(`Test Finished\nNum${CurTest.num-1}\nTrue${CurTest.true}\nFalse${CurTest.false}`)
    Menu("test")
  } else {
    CurentSelectedWord = SelectRand(ar_FT); // ar_FT[(Math.floor(Math.random()*ar_FT.length))];
    
    if (test_option.lang === "kr-to-uz") {
      document.getElementById("test_ask_word").innerHTML = 
        words[CurentSelectedWord].kr_word;
      document.getElementById("test_check_word").innerHTML =
        words[CurentSelectedWord].kr_word;
      document.getElementById("test_check_answer").innerHTML = 
        words[CurentSelectedWord].uz_word;
    } else if (test_option.lang === "uz-to-kr") {
      document.getElementById("test_ask_word").innerHTML = 
        words[CurentSelectedWord].uz_word;
      document.getElementById("test_check_word").innerHTML =
        words[CurentSelectedWord].uz_word;
      document.getElementById("test_check_answer").innerHTML = 
        words[CurentSelectedWord].kr_word;
    }
  }
}
//
function SoundBtn() {
  if (test_option === "kr-to-uz") {
    lang_ = "kr";
  } else if (test_option === "uz-to-kr") {
    lang_ = "uz";
  }
  TextToSpeech(words[CurentSelectedWord].kr_word, "en");
}
//
function TestCheck(bool_) {
  if (bool_) {
    CurTest.true++;
    words[CurentSelectedWord].tested.push({
      date: getCurrentDateTime(),
      result: true
    })
  } else {
    CurTest.false++;
    words[CurentSelectedWord].tested.push({
      date: getCurrentDateTime(),
      result: false
    })
  }
  SetDataToLS();
  test.ask.style.visibility = "visible";
  test.check.style.visibility = "hidden";
  NewTest();
}
//
function CheckTheAnswer() {
  test.ask.style.visibility = "hidden";
  test.check.style.visibility = "visible";
}
//
function SetDataToLS() {
  localStorage.setItem("ENG_VOC_MY_ffLS", JSON.stringify(words));
}
//
function ShowWords() {
  count = 0;
  words_list.innerHTML = "";
  words.forEach(element => {
    count++;
    words_list.innerHTML += `
      <div class="word_elem" onclick="ClickedWord(${count});">
        <div class="w_e_left">
          <p class="lang_word">${element.kr_word}</p>
          <p class="lang_des">${element.kr_des}</p>
        </div>
        <div class="w_e_right">
          <p class="lang_word">${element.uz_word}</p>
          <p class="lang_des">${element.uz_des}</p>
        </div>
      </div>`;
  });
}
//
function ClickedWord(param1) {
  CurentSelectedWord = param1 - 1;
  re_inp.kr.word.value = words[CurentSelectedWord].kr_word;
  re_inp.kr.des.value = words[CurentSelectedWord].kr_des;
  re_inp.uz.word.value = words[CurentSelectedWord].uz_word;
  re_inp.uz.des.value = words[CurentSelectedWord].uz_des;
  document.getElementById("word_show_date").innerHTML =
    `Added date => ${words[CurentSelectedWord].date}`;
  move_list.style = `transform: translate(-${3*100/NumOfList}%, 0);`;
    var ans_ = {
      tr: 0,
      fa: 0
    };
    words[CurentSelectedWord].tested.forEach(element => {
      if (element.result) {
        ans_.tr++;
      } else {
        ans_.fa++;
      }
    });   
      var lastend = 0;
      var data = [ans_.tr, ans_.fa]; // If you add more data values make sure you add more colors
      var myTotal = 0; // Automatically calculated so don't touch
      var myColor = ["green", "red", "yellow"]; // Colors of each slice
      if (ans_.tr === 0 && ans_.fa === 0) {
        data = [1];
        myColor = ["yellow"];
      }
      for (var e = 0; e < data.length; e++) {
        myTotal += data[e];
      }
      for (var i = 0; i < data.length; i++) {
        if ( i === 0) {
          lastend = -(Math.PI * 2 * (data[i] / myTotal)/2);
        }
        ctx.fillStyle = myColor[i];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(
          canvas.width / 2,  // x
          canvas.height / 2, // y
          canvas.height / 2, // radius
          lastend,           // startingAngle (radians)
          lastend + Math.PI * 2 * (data[i] / myTotal), // endingAngle (radians)
          false // antiClockwise (boolean)
        );
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();
        lastend += (Math.PI * 2 * (data[i] / myTotal));
      }
      document.getElementById("diagramm_tr").innerHTML = ans_.tr;
      document.getElementById("diagramm_fa").innerHTML = ans_.fa;
}
//
function DeleteWord() {
  words.splice(CurentSelectedWord, 1);
  SetDataToLS();
  move_list.style = `transform: translate(-${1*100/NumOfList}%, 0);`;
  ShowWords();
}
//
function ChangeWord() {
  if (re_inp.kr.word.value !== "" &&
      re_inp.uz.word.value !== "") {
        words[CurentSelectedWord].uz_word = re_inp.uz.word.value;
        words[CurentSelectedWord].uz_des = re_inp.uz.des.value;
        words[CurentSelectedWord].kr_word = re_inp.kr.word.value;
        words[CurentSelectedWord].kr_des = re_inp.kr.des.value;
        SetDataToLS();
        move_list.style = `transform: translate(-${1*100/NumOfList}%, 0);`;
        ShowWords();
      }
}
//
function Menu(list_) {
  if (list_ === "add") {
    move_list.style = `transform: translate(0, 0);`;
      inp.kr.word.value = "";
      inp.kr.des.value = "";
      inp.uz.word.value = "";
      inp.uz.des.value = "";
  } else if (list_ === "words") {
    move_list.style = `transform: translate(-${1*100/NumOfList}%, 0);`;
    ShowWords();
  } else if (list_ === "test") {
    move_list.style = `transform: translate(-${2*100/NumOfList}%, 0);`;
  } else if (list_ === "menu") {
    move_list.style = `transform: translate(-${6*100/NumOfList}%, 0);`;
  }
}
//

function AddNewWord() {
  id__ = words.length;
  if (inp.kr.word.value !== "" && 
      inp.uz.word.value !== "") {
      words.push({
        id: id__,
        kr_word: inp.kr.word.value,
        kr_des: inp.kr.des.value,
        uz_word: inp.uz.word.value,
        uz_des: inp.uz.des.value,
        date: getCurrentDateTime(),
        tested: []
      });
      SetDataToLS();
      inp.kr.word.value = "";
      inp.kr.des.value = "";
      inp.uz.word.value = "";
      inp.uz.des.value = "";
  } else {
    alert("Enter Word");
  }
}

//

function daysPassedSince(dateString) {
  // Parse the entered date string into a Date object
  var enteredDate = new Date(dateString);
  // Get the current date
  var currentDate = new Date();
  // Calculate the difference in milliseconds between the current date and the entered date
  var timeDifference = currentDate.getTime() - enteredDate.getTime();
  // Convert the time difference from milliseconds to days
  var daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));
  return daysPassed;
}
//
function timePassedSince(dateTimeString) {
  // Parse the entered date and time string into a Date object
  var enteredDateTime = new Date(dateTimeString);
  // Get the current date and time
  var currentDateTime = new Date();
  // Calculate the difference in milliseconds between the current date/time and the entered date/time
  var timeDifference = currentDateTime.getTime() - enteredDateTime.getTime();
  // Calculate days, hours, minutes, and seconds
  var daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));
  var hoursPassed = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
  var minutesPassed = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
  var secondsPassed = Math.floor((timeDifference % (1000 * 60)) / 1000);
  // Construct and return the result string
  var result = "";
  if (daysPassed > 0) {
    result += daysPassed + " day" + (daysPassed > 1 ? "s" : "") + ", ";
  }
  result += hoursPassed + " hour" + (hoursPassed !== 1 ? "s" : "") + ", ";
  result += minutesPassed + " minute" + (minutesPassed !== 1 ? "s" : "") + ", ";
  result += secondsPassed + " second" + (secondsPassed !== 1 ? "s" : "");
  return result;
}
// 
function getCurrentDateTime() {
  var currentDate = new Date();
  // Get the components of the current date and time
  var year = currentDate.getFullYear();
  var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based month
  var day = ('0' + currentDate.getDate()).slice(-2);
  var hours = ('0' + currentDate.getHours()).slice(-2);
  var minutes = ('0' + currentDate.getMinutes()).slice(-2);
  var seconds = ('0' + currentDate.getSeconds()).slice(-2);
  // Construct the date and time string in the desired format (YYYY-MM-DD HH:MM:SS)
  var currentDateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
  return currentDateTime;
}


    // Converts Text to Speech {en,uz,ru,kr}
    function TextToSpeech(text_, lang_) {
      if ('speechSynthesis' in window) {
        // Create a new SpeechSynthesisUtterance object
        var utterance = new SpeechSynthesisUtterance();
        // Set the text to be spoken
        utterance.text = text_;
        // Specify Korean as the language
        if (lang_ === "kr") {
          utterance.lang = 'ko-KR';
        } else if (lang_ === "uz") {
          utterance.lang = 'uz-UZ'; // Set language to Uzbek
        } else if (lang_ === "en") {
          utterance.lang = 'en-US'; // Set language to English
        } else if (lang_ === "ru") {
          utterance.lang = 'ru-RU'; // Set language to Russian
        }
        // Speak the text
        speechSynthesis.speak(utterance);
      } else {
        // If speech synthesis is not supported, alert the user
        alert('Sorry, your browser does not support speech synthesis.');
      }
    }

    function CopyWords() {
      navigator.clipboard.writeText(JSON.stringify(localStorage.getItem("ENG_VOC_MY_ffLS")));
    }

    function SetAllWords() {
      localStorage.setItem("ENG_VOC_MY_ffLS",(JSON.parse(document.getElementById("textarea_for_setallwords").value)))
    }

    function ResetAllData() {
      if (confirm('Are you sure you want to Reset all data?')) {
        // Save it!
        console.log('Thing was saved to the database.');
        localStorage.removeItem("ENG_VOC_MY_ffLS");
      }
    }

    //
    //
    //
    // SHULD BE DELETED 
    /*let fff = [0,0,0,0,0];
    for (let i = 1; i <= 5000; i++) {
      //
      //
      object_for_time = [];
    
      params_arr = SortArray(words, (document.getElementById("test_select_date_today").checked)?("today"):
            ((document.getElementById("test_select_date_week").checked)?("week"):
            (((document.getElementById("test_select_date_all").checked)?("all"):("error")))))

      params_arr.forEach(element => {
        fa_FT = 0;
        num_of_tested = 0;
        element.tested.forEach(elem => {
          num_of_tested++;
          if (elem.result !== true) {
            fa_FT++;
          }
        });
        fa_FT = fa_FT / num_of_tested;
        object_for_time.push(
          {
            ind: element.id,
            fa: fa_FT
          }
        );
      });
      fff[CurentTestNth = SelectRand(object_for_time)]++;
    }
    console.table(fff)
    //
    //
    console.log("err ==>> \n_")
    fff = [0,0,0,0,0];
    for (let i = 1; i <= 5000; i++) {
    ar_FT = [];
    for (let i = 0; i < words.length; i++) {
      if (test_option.date === "today") {
        if ( daysPassedSince(words[i].date) <= 0) {
          ar_FT.push(ReturnIndFa(i,words[i]));
        }
      } else if (test_option.date === "week") {
        if ( daysPassedSince(words[i].date) <= 6) {
          ar_FT.push(ReturnIndFa(i,words[i]));
        }
      } else {
        ar_FT.push(ReturnIndFa(i,words[i]))
      }
    }
    fff[CurentTestNth = SelectRand(object_for_time)]++;
    }

    console.table(fff)*/
    ///
    //

    ///
    ///
    ///
    function SelectRand(object_) {
      answer_ = 0;
      All_chechs_ = 0;
      object_.forEach(element => {
        All_chechs_+=element.fa;
      });
      tmAr = [];
      object_.forEach(element => {
        tmAr.push({ind: element.ind, 
          kf: (element.fa/All_chechs_)})
      });
      tmAr.forEach(element => {
        element.kf /= 2;
        element.kf += ((0.5/object_.length));
      });
      //console.table(tmAr)
      //console.table(tmAr);
      for (let i = 1; i < tmAr.length; i++) {
        tmAr[i].kf+=tmAr[i-1].kf;
      }
      Ran_Num_ = Math.random();
      for (let i = tmAr.length-1; i >= 0;i--) {
        if (tmAr[i].kf >= Ran_Num_) {
          answer_ = tmAr[i].ind;
        }
      }
      return answer_;
    }