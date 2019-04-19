export const indexBy = key => (lists = []) => {
  return lists.reduce((res, item) => (res[item.id] = item) && res, {});
};

export function convertCustomFieldItems(fields, fieldMaps) {
  const [process, fieldsDesc] = [[], []];
  fields.forEach(item => {
    const theField = fieldMaps[item.idCustomField];
    const common = { name: theField.name, id: item.id };
    if (item.value.text) {
      fieldsDesc.push({ ...common, value: item.value.text });
    } else {
      process.push({ ...common, value: item.value.checked });
    }
  });
  return { process, fields: fieldsDesc };
}
