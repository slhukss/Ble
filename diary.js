// メニューリスト作成
function makeDiaryList(displayArry) {
    // リストの親要素取得
    const diary = $(".diary");
    // 表示する数だけ繰り返す
    for (let i = 0; i < displayArry.length; i++) {
        // 日記オブジェクト
        const diaryObj = displayArry[i];
        // 日記の日付
        const diary_date = diaryObj.date;
        // 日記の写真が何枚あるか確認
        let diary_photos = null;
        for (let l = 0; l < diaryObj.photos.length; l++) {
            console.log(diaryObj.photos[l]);
            if (diary_photos == null) {
                diary_photos = "<img src='image/diary/" + diaryObj.id + "/" + diaryObj.photos[l] + ".jpg' alt='" + diaryObj.photos[l] + "'>"
            } else {
                diary_photos = diary_photos +  "<img src='image/diary/" + diaryObj.id + "/" + diaryObj.photos[l] + ".jpg' alt='" + diaryObj.photos[l] + "'>"
            }
        }
        // 日記本文
        const diary_text = diaryObj.text;
        // リスト要素作成
        const diary_list = "<article><h2 class='article-title'>" + diary_date + "</h2>"
                            + "<div class='img_display'>" + diary_photos + "</div>"
                            + "<p class='text'>" + diary_text + "</p>"
                            + "</article>"
        // リストに追加
        diary.append(diary_list);
    }
}

// メニュー画面の初めの画面表示用
$(document).ready(() => {
    $.getJSON("diary.json", (data) => {
        makeDiaryList(data);
    });
});