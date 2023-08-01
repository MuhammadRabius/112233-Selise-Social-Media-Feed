

// date generate

export const getDate = (d) =>  {
    const date = new Date(d);
    return `${date.getDate()}, ${[date.getMonth()]}, ${date.getFullYear()}`

}

export const getGrapFillColor = (typeName) => {
  
    switch (typeName) {
  
      case 'Organic':
        return "#0090DA"
  
      case 'Paid':
        return "#5F259F"
  
      case 'Agent Led':
        return "#A4CE4E"
  
      default:
        return '#A4CE4E';
    }
  }