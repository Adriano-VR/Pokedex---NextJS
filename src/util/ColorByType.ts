const getColorByType = (type: string): string => {
    switch (type) {
        case 'fire':
            return 'red';
        case 'water':
            return 'blue';
        case 'grass':
            return 'green';
        case 'electric':
            return 'yellow';
        case 'ice':
            return 'lightblue';
        case 'fighting':
            return 'brown';
        case 'poison':
            return 'purple';
        case 'ground':
            return 'sandybrown';
        case 'flying':
            return 'skyblue';
        case 'psychic':
            return 'pink';
        case 'bug':
            return 'olive';
        case 'rock':
            return 'gray';
        case 'ghost':
            return 'indigo';
        case 'dragon':
            return 'orange';
        case 'dark':
            return 'black';
        case 'steel':
            return 'silver';
        case 'fairy':
            return 'lightpink';
        default:
            return 'white';
    }
};

export default getColorByType;