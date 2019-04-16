export const indexBy = key => (lists = []) => {
  return lists.reduce((res, item) => (res[item.id] = item) && res, {});
};

export function convertCustomFieldItems(fields, fieldMaps) {
  return fields.map(item => {
    const theField = fieldMaps[item.idCustomField];
    return {
      name: theField.name,
      value: item.value.text || item.value.checked,
      id: item.id
    };
  });
}
