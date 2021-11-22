

export const getRandom = (num) => Math.ceil(Math.random() * num);

export const  createElement = (element, classname) => {
    const $elem = document.createElement(element);
    if (classname) {
        $elem.classList.add(classname);
    }
    
    return $elem;
}

export const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);