// メニューリスト作成
function makeMenuList(displayArry) {
    // リストの親要素取得
    const menu = $(".list_menu");
    // 表示する数だけ繰り返す
    for (let i = 0; i < displayArry.length; i++) {
        // メニューID
        const menu_id = displayArry[i].menu_id;
        // メニュー名
        const menu_name = displayArry[i].menu_name;
        // リスト子要素作成
        const menu_list = "<li class='bread'><button class='bread_button' "
                            +  "id='" + menu_id + "'>"
                            + "<img src='image/" + menu_id + ".jpg' "
                            + "alt='" + menu_name + "' class='bread_menu'></button>"
                            + "<div class='popup' id='" + menu_id + "_popup'></div>"
                            + "</li>";
        // リストに追加
        menu.append(menu_list);
    }
}

// メニュー検索
function searchMenu(id) {
    return new Promise((resolve) => {
        let menu = {};
        $.getJSON("menu.json", (data) => {
            // JSONファイルからIDが合致するパンを探す
            for (let i = 0; i < data.length; i ++) {
                if (data[i].menu_id == id) {
                    // IDが合致するパンを見つけたらobjectを作成する
                    menu.name = data[i].menu_name;
                    menu.description = data[i].description;
                }
            }
            resolve(menu);
        });
    });
}

// メニュー画面の初めの画面表示用
$(document).ready(() => {
    $.getJSON("menu.json", (data) => {
        makeMenuList(data);
    });
});

/*ポップアップ用*/
$(document).on("click", ".bread_button", async (e) => {
    // 押下されたボタンのIDを取得
    const id = e.currentTarget.id;
    // ポップアップのdiv表示エリアのIDを生成
    var displayId = '#' + id + '_popup';
    // ポップアップのdiv要素用IDを生成
    const popupID = id + "_description";
    const judgeId = '#' + popupID;
    // ポップアップ表示内容がすでに生成されているか判断用(多重にポップアップが生成されるのを防ぐ)
    const judge = $(judgeId).get(0);
    if (!judge) {
        // まだポップアップの内容が生成されていなかった場合
        // メニューの詳細を検索
        const menu = await searchMenu(id);
        // ポップアップの中身を生成
        const popup = "<div class='popup_content' id='"+ popupID + "'><img class='bread_detail' src='image/" + id + ".jpg' alt='" + menu.name + "''>"
                        + "<h2>" + menu.name  + "</h2><p>" + menu.description + "</p><button class='close'>close</button></div>";
        $(displayId)
                .append(popup) // ポップアップの内容を追加
                .addClass("show") // 表示
                .fadeIn();
                // return false;
    } else {
        // すでにポップアップの内容が作成されていた場合
        $(displayId).addClass("show") // 表示
                    .fadeIn();
    }
});

// ポップアップのクローズボタン
$(document).on("click", ".close", (e) => {
    console.log("close");
    $(".popup").fadeOut();
    // return false;
});

// メニュー選択
$('#types').change(function() {
    // 親要素取得
    const menu = $(".list_menu");
    // プルダウンメニューから選ばれた要素
    const selectedMenu = $('#types option:selected').val();
    console.log(selectedMenu + " is selected");
    // 表示するメニュー
    let displayArry = [];
    // 現在表示されているリスト削除
    menu.children().remove();
    // JSONファイル取得
    $.getJSON("menu.json", (data) => {
        // 全メニューが選択されていた場合
        if (selectedMenu == "all_menu") {
            // JSONの内容すべて追加
            displayArry = data;
        } else {
            // 要素が選択されていた場合
            for (let i = 0; i < data.length; i++) {
                if (data[i].flavour == selectedMenu) {
                    // 選択されていたカテゴリがメニューカテゴリと合致した場合に表示メニューに追加
                    displayArry.push(data[i]);
                }
            }
        }
        // メニューリスト作成へ
        makeMenuList(displayArry);
    });
});