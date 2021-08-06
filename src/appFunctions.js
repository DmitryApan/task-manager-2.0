export function getFunctionFindCard(key) {
    return (value, cards) => {
        let card = null;
        Object.values(cards).find(array => (
            card = array.find(item => item[key] === value)
        ));

        return card;
    }
}

export function findCardById(id, cards) {
    return getFunctionFindCard('_id')(id, cards);
}

export function findCardByTitle(title, cards) {
    return getFunctionFindCard('title')(title, cards);
}

export function findCardsByStatus(status, cards) {
    return cards[status] || [];
}

export function findCardsByDisabledStatuses(statuses, cards) {
    const reducedCards = statuses.reduce((acc, status) => {
        if (status.enabled) {
          delete acc[status.name];
        }
    
        return acc;
    }, { ...cards });
    
    return Object.values(reducedCards).flat()
}

export function getColorByStatus(statuses, name) {
    const status = statuses.find(status => status.name === name);

    return status ? status.color : 'gray';
}

export function findUserById(id, usersApp) {
    return usersApp.find(item => (item._id === id));
}

export function findPossiblyOwners(owners, usersApp) {
    return usersApp.filter((user) => (
        !owners.find(idOwner => user._id === idOwner)
    ));
}

export function findCardParentByIdChild(idChild, cards) {
    let card = null;
    
    Object.values(cards).find(array => (
        card = array.find(item => item.children.includes(idChild))
    ));

    return card;
}

export function findAvalibleChildsToAdd(id, cards) {
    const generalArrayCards = Object.values(cards).reduce((prev, item) => [...prev, ...item]);
    
    return generalArrayCards.filter((card) => {
        if ((id === card._id) || card.children.includes(id)) {
            return false;
        }
        
        return !generalArrayCards.find((item) => (
            item.children.includes(card._id)
        ));      
    });
}

export function sortCardsByTitle(cards, ascending) {
    let cardsSort = cards.sort((a, b) => {
        let charA = a.title.toUpperCase();
        let charB = b.title.toUpperCase();

        if ((ascending && (charA < charB)) 
        || (!ascending && (charA > charB))) {
            return 1;
        } else {
            return -1;
        }
    });

    return cardsSort;
}

export function getCardsByArrayId(arrayId, cards) {
    return arrayId.map(id => findCardById(id, cards));
}

export function getCardsByArrayTitle(arrayTitle, cards) {
    return arrayTitle.map(title => findCardByTitle(title, cards));
}

export function getParentCardByIdChildren(id, cards) {
    let card = null;

    Object.values(cards).find(array => (
        card = array.find(({children}) => (
            children.find(idChildren => idChildren === id)
        ))
    ));

    return card;
}

export function getParentCardArrayByIdChildren(id, cards) {
    let array = [];
    let parent = findCardById(id, cards);
    
    while(parent) {
        array = [parent, ...array];
        parent = getParentCardByIdChildren(parent._id, cards);
    }

    return array;
}

export function filterStatusesByEnabled(statuses) {
    return statuses.filter(({enabled}) => enabled);
}

export function getStatusNameAdditionOfSettings(name, statuses) {
    return statuses.find(status => status.name === name) ? name : `${name} (deleted)`;
}    

export function getStateStatus(name, statuses) {
    return !!statuses.find(status => status.name === name).enabled;
}

export function getExistStatus(name, statuses) {
    return !!statuses.find(status => status.name === name);
}

export function getRandomColor() {
    return '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
}