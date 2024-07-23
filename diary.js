// メニューリスト作成
function makeDiaryList(displayArry, number) {
    var newNumber = number;
    var basedNumber = 0;
    // リストの親要素取得
    const diaryEntry = $(".entry_list");
    const diaryMain = $('.diary');
    const judge = $('.entry_list li').get(0);
    if (judge) {
        basedNumber = newNumber;
        newNumber = newNumber + 3;
    }
    // 表示する数だけ繰り返す
    for (let i = basedNumber; (i < newNumber) && (i < displayArry.length); i++) {
        // 日記オブジェクト
        const diaryObj = displayArry[i];
        console.log(diaryObj);
        // 日記の日付
        const diary_date = diaryObj.date;
        // 日記の写真が何枚あるか確認
        let diary_photos = null;
        for (let l = 0; l < diaryObj.photos.length; l++) {
            if (diary_photos == null) {
                diary_photos = "<img src='image/diary/" + diaryObj.id + "/" + diaryObj.photos[l] + ".jpg' alt='" + diaryObj.photos[l] + "'>"
            } else {
                diary_photos = diary_photos +  "<img src='image/diary/" + diaryObj.id + "/" + diaryObj.photos[l] + ".jpg' alt='" + diaryObj.photos[l] + "'>"
            }
        }
        // 日記本文
        const diary_text = diaryObj.text;
        // リスト要素作成
        const diary_list = "<li><article class='entry'><h2 class='article-title'>" + diary_date + "</h2>"
                            + "<div class='img_display'>" + diary_photos + "</div>"
                            + "<p class='text'>" + diary_text + "</p>"
                            + "</article></li>";
        // リストに追加
        diaryEntry.append(diary_list);
       if (displayArry.length - i == 1) {
        $('.more').hide();
       }
    }
    if(!$('.more').length){
        console.log("more button needs to be displayed!")
        diaryMain.append("<div class='more'><button>next entries</button></div>");
    }
}

// メニュー画面の初めの画面表示用
$(document).ready(() => {
    $.getJSON("diary.json", (data) => {
        makeDiaryList(data, 3);
    });
});

// もっと読むボタン
$(document).on('click', '.more', function () {
    var number = $('.entry').length;
    $.getJSON("diary.json", (data) => {
        makeDiaryList(data, number);
    });
});