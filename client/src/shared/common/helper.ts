import type ListItem from "@/models/listItem";

function convertEnumToListItem(enumName: any): ListItem[] {
  const list = [];

  for (const item in enumName) {
    if (typeof enumName[item] == 'number') list.push({ id: enumName[item], title: enumName['_' + enumName[item]] } as ListItem);
  }

  return list;
}

const objectIntoQueryStringParameters = (obj: any) => {
  if (Object.keys(obj).length == 0) return '';
  return (
    '?' +
    Object.keys(obj)
      .filter((e) => obj[e] != null)
      .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&')
  );
};


export default { convertEnumToListItem , objectIntoQueryStringParameters }