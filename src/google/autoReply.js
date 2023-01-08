function autoreply() {
    //自動返信メールの件名
    const title = "【パン教室Ble】ご予約ありがとうございます。";

    //自動返信メールの本文　\nは改行。
    let body
    = "ご予約いただき誠にありがとうございます。\n"
    + "下記の通り、ご予約を受け付けました。\n\n"
    + "————————————————————\n";

    //自動返信メールの本文2　本文1と本文2の間に入力内容が入る
    const body2
    = "————————————————————\n"
    + "ご希望内容確認後、ご予約確定メールを送付いたします。\n"
    + "ご予約確定メールが届くまではご予約は確定しておりませんのでご注意ください。\n"
    + "返信までには1～2日ほどかかる場合がございます。\n"
    + "ご予約内容の変更など、お問い合わせはこちらのメールにご返信いただくか\n"
    + "03-3737-0167までお電話ください。\n"
    + "※電話受付時間: 10:00～18:00";

    //後の処理で使うため、変数を設定。（フォームと名称を一致させる必要あり）
    const name = "お名前";
    const mail = "メールアドレス";
    const timestamp = "タイムスタンプ";
    const replyJudge = "返信済";
    const datePreferences = "ご予約ご希望日";
    const days = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"];
    let address = "";
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = sheet.getLastRow();
    const column = sheet.getLastColumn();
    const range = sheet.getDataRange();
    for (var i = 1; i <= column; i++ ) {
      
      //スプレッドシートの入力項目名
      let item = range.getCell(1, i).getValue();
      //スプレッドシートの入力値
      var value = range.getCell(row, i).getValue();

      // タイムスタンプと返信済みのコラムはメールに含めない
      if ( item !== timestamp && item !== replyJudge && item !== name && item !== mail) {

        // 日時の場合文字列に変換する
        if (item.match(datePreferences)) {
          // 元の日付をDateオブジェクトに変換する 
          let originalDate = new Date(value);
          // UTC表記に直す
          let utcDateString = originalDate.toUTCString();
          // UTC時間で再度Dateオブジェクトを作る
          let utcDate = new Date(utcDateString);
          // 日本標準時間へ変更
          utcDate.setTime(utcDate.getTime() + 1000 * 60 * 9); 
          let year = utcDate.getUTCFullYear();
          let month = utcDate.getUTCMonth() + 1;
          let date = utcDate.getUTCDate();
          let day = days[utcDate.getUTCDay()];
          let bookingDate = year + "/" + month + "/" + date + day;
          value = bookingDate;
        }

        //本文（body）に、フォームの入力項目を追加
        body += "■"+item+"\n";

        //本文にフォームの入力内容を追加
        body += value + "\n\n";

      } else if (item === name) {
        body = value+" 様\n\n"+body;
      } else if (item === mail) {
        address = value;
      }
    }

    //本文1に本文2を追加
    body += body2;
    //宛名＝address、件名＝title、本文=bodyで、メールを送る
    GmailApp.sendEmail(address,title,body);
}