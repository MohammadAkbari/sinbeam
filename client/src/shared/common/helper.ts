import type ListItem from "@/models/listItem";

function convertEnumToListItem(enumName: any): ListItem[] {
    const list = [];
  
    for (const item in enumName) {
      if (typeof enumName[item] == 'number') list.push({ id: enumName[item], title: enumName['_' + enumName[item]] } as ListItem);
    }
  
    return list;
  }


  export default {convertEnumToListItem}