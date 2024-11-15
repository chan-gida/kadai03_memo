var parsedData //グローバル変数として設定

// CSVデータの取り込み
$(document).ready(function () {
    $(".csvFileInput").on("change", function (e) {
        //ファイル変更時発火
        var file = event.target.files[0];
        //前のchangeから情報が含まれたeventオブジェクトが渡される。このオブジェクトには、どのファイルが選択されたかを含むプロパティが含まれる。
        //オブジェクトを取得 → このファイルをPapa.parseに渡して処理

        // Papa.parseプラグイン処理（CSVをJSON形式に変換）
        if (file) {
            Papa.parse(file, {
                delimiter: ",",
                header: false, //CSVファイルの１行目をヘッダー処理
                complete: function (results) {
                    parsedData = results.data;

                    for (var i = 0; i < parsedData.length; i++) {
                        var row = parsedData[i];
                        console.log(row);
                        //変換完了

                        //グラフ表示 =======================
                        var html = "<tr>";
                        for (var j = 0; j < row.length; j++) {  //行の繰り返し処理
                            var value = row[j];
                            if (i == 0) { //1行目は見出し<th>として扱う、それ以外値<td>
                                html += "<th><span>" + value + "</span></th>";
                            } else {
                                html += "<td><span>" + value + "</span></td>";
                            }
                        }
                        html += "</tr>"; //trごとにテーブルタグに挿入
                        $(".csvTable").append(html);
                        //グラフ表示完了 ====================
                    }
                    return parsedData;
                },
            });
        } else {
            alert("ファイルが選択されていません。");
        }
    });
});

//Save クリックイベント
$(".save").on("click", function () {

    // ローカルストレージに保存
    localStorage.setItem('parsedData', JSON.stringify(parsedData));
    alert('CSVデータがローカルストレージに保存されました');
})

//clear クリックイベント
$(".clear").on("click", function () {
    localStorage.clear();
});

//呼び出し クリックイベント
$(".get").on("click", function () {
    // ローカルストレージからデータを取得
    var storedData = localStorage.getItem('parsedData');
    if (storedData) {
        var parsedData = JSON.parse(storedData);

        // テーブルにデータを再表示
        for (var i = 0; i < parsedData.length; i++) {
            var row = parsedData[i];
            var html = "<tr>";
            for (var j = 0; j < row.length; j++) {
                var value = row[j];
                if (i == 0) { // 1行目はヘッダーとして扱う
                    html += "<th><span>" + value + "</span></th>";
                } else {
                    html += "<td><span>" + value + "</span></td>";
                }
            }
            html += "</tr>";
            $(".csvTable").append(html);
        }
    } else {
        alert("保存されたデータがありません。");
    }
})