const useInput = (setState, guide) => {
  const isCheckedInput = (type) => {
    return type === "switch" || type === "radio" || type === "checkbox";
  };

  const handler = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    let value = e.target.value;

    if (type === "number") {
      value = Number(value.replace(/\D/g, ""));
    }

    setState((data) => ({
      ...data,
      [name]: isCheckedInput(type) ? e.target.checked : value,
    }));
    guide.setData((data) => ({
      ...data,
      [name]: {
        message: e.target.validationMessage,
        isValid: e.target.checkValidity(),
      },
    }));
  };

  return { handler, guide };
};

export default useInput;
