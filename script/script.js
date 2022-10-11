// $(document).ready(function() {

//     $('#tbInventory tr').click(function() {
//         var href = $(this).find("a").attr("href");
//         if(href) {
//             window.location = href;
//         }
//     });

// });

$(document).ready(RefreshDisplayedData());

const tbInventory = document.GetElementById("tbInventory");

function RefreshDisplayedData(){
    tbInventory.InnerHTML = "
            <tr>
                <th>Edit</th>
                <th>UPC</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>"
}
