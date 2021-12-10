function copy() {
  // 【Google Apps Script入門】セルの取得・変更をする_https://uxmilk.jp/25841

  // アクティブなスプレッドシートの情報を取得_【初心者向けGAS】プログラミングに必須の変数＆定数の使い方とデータ型について_https://tonari-it.com/gas-variable-data-type/
  const spreadsheet = SpreadsheetApp.getActive();

  // シート名「テンプレート」を取得
  const template = spreadsheet.getSheetByName("テンプレート");

  // シート名「テンプレート」の最大列幅/行幅を取得【GAS・スプレッドシート】行数・列数を取得する方法｜指定した範囲・データ入力の範囲_https://blog-and-destroy.com/33915
  const template_rows = template.getLastRow();
  // const template_column = template.getLastColumn();

  // シート名「テンプレート」のヘッダーを取得(A列)_配列の変数を定義_第21回.配列って何なんだ？_https://excel-ubara.com/apps_script1/GAS021.html
  let template_header = [];
    for(let header = 1; header <= template_rows; header++) {
      template_header.push(template.getRange(header, 1).getValue());
    }

  // シート名「CSV」を取得
  const csv = spreadsheet.getSheetByName("CSV");

  // シート名「CSV」の最大列幅/行幅を取得【GAS・スプレッドシート】行数・列数を取得する方法｜指定した範囲・データ入力の範囲_https://blog-and-destroy.com/33915
  const csv_rows = csv.getLastRow();
  const csv_column = csv.getLastColumn();

  // // シート名「CSV」のヘッダーを取得(1行目)_配列の変数を定義_第21回.配列って何なんだ？_https://excel-ubara.com/apps_script1/GAS021.html
  // let csv_header = [];
  //   for(let header = 0; header <= csv_column; header++) {
  //     csv_header.push(csv.getRange(1, header + 1).getValue());
  //   }
  //   // テストコード
  //   // Browser.msgBox(csv_header);

  let csv_header = '対象項目なし';

    // 独自関数を呼び出す
    // 行情報を繰り返し更新_【初心者向けGAS】for文を使ったスプレッドシートの繰り返しの超基本_https://tonari-it.com/gas-for/
    for(let header = 0; header <= template_header.length; header++) {
      csv_header =  gas_vlookup_column(template_header[header],csv,1);

      if(csv_header != '対象項目なし'){

        // 列情報を繰り返し更新_【初心者向けGAS】for文を使ったスプレッドシートの繰り返しの超基本_https://tonari-it.com/gas-for/
        for(let column = 1; column <= csv_rows; column++) {

            // 参照元シートから参照先シートへコピー_【GAS】スプレッドシートのコピー機能まとめ【サンプルソース付】_https://caymezon.com/gas-all-copy-paste/
            csv.getRange(column + 1, csv_header).copyTo(template.getRange(header + 1, column + 1), SpreadsheetApp.CopyPasteType.PASTE_NO_BORDERS, false);

        }
      }
    }
};

// 呼び出される独自関数
function gas_vlookup_column(template_header_value,sheet,column) {
  let sheet_header = '対象項目なし';
  for (let header = 1; header <= sheet.getLastRow(); header++) {
    let csv_header_value = sheet.getRange(1,header).getValue();
    if(template_header_value == csv_header_value){
      sheet_header = header;
      break;
    }
  }    
  return sheet_header;
}