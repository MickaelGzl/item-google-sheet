export function regroupDataByCategory(data) {
  const regroupData = [];
  data.forEach((item, index) => {
    const sameItem = findSameItem(regroupData, item, "category");

    if (sameItem) {
      const sameItemSubCat = findSameItem(
        sameItem.subcategory,
        item,
        "subcategory"
      );
      if (sameItemSubCat) {
        sameItemSubCat.items.push(addItem(item, index));
      } else {
        sameItem.subcategory.push(addSubcat(item, index));
      }
    } else {
      regroupData.push({
        category: item.category,
        subcategory: [addSubcat(item, index)],
      });
    }
  });
  return regroupData;
}

function findSameItem(array, item, key) {
  return array.find((i) => i && i[key] === item[key].trim());
}

function addItem({ name, quantity, price, image }, id) {
  return { name, quantity, price, image, id: id + 2 };
}
function addSubcat(item, index) {
  return { subcategory: item.subcategory, items: [addItem(item, index)] };
}
