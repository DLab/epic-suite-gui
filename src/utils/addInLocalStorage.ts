const addInLocalStorage = (data: unknown[], key: string): void => {
    const models: unknown[] = JSON.parse(window.localStorage.getItem(key));
    const newModels = JSON.stringify([...models, ...data]);
    window.localStorage.setItem(key, newModels);
};

export default addInLocalStorage;
