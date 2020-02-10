// {value: 1, imageURL: "./images/AC.jpg"},
// {value: 2, imageURL: "./images/2C.jpg"}, 
// {value: 3, imageURL: "./images/3C.jpg"},
// {value: 4, imageURL: "./images/4C.jpg"},
// {value: 5, imageURL: "./images/4C.jpg"},
// {value: 6, imageURL: "./images/6C.jpg"}, 
// {value: 7, imageURL: "./images/7C.jpg"},
// {value: 8, imageURL: "./images/8C.jpg"},
// {value: 9, imageURL: "./images/9C.jpg"},
// {value: 10, imageURL: "./images/10C.jpg"}, 
// {value: 11, imageURL: "./images/JC.jpg"},
// {value: 12, imageURL: "./images/QC.jpg"},
// {value: 13, imageURL: "./images/KC.jpg"},

// {value: 1, imageURL: "./images/AD.jpg"},
// {value: 2, imageURL: "./images/2D.jpg"}, 
// {value: 3, imageURL: "./images/3D.jpg"},
// {value: 4, imageURL: "./images/4D.jpg"},
// {value: 5, imageURL: "./images/4D.jpg"},
// {value: 6, imageURL: "./images/6D.jpg"}, 
// {value: 7, imageURL: "./images/7D.jpg"},
// {value: 8, imageURL: "./images/8D.jpg"},
// {value: 9, imageURL: "./images/9D.jpg"},
// {value: 10, imageURL: "./images/10D.jpg"}, 
// {value: 11, imageURL: "./images/JD.jpg"},
// {value: 12, imageURL: "./images/QD.jpg"},
// {value: 13, imageURL: "./images/KD.jpg"},

// {value: 1, imageURL: "./images/AH.jpg"},
// {value: 2, imageURL: "./images/2H.jpg"}, 
// {value: 3, imageURL: "./images/3H.jpg"},
// {value: 4, imageURL: "./images/4H.jpg"},
// {value: 5, imageURL: "./images/4H.jpg"},
// {value: 6, imageURL: "./images/6H.jpg"}, 
// {value: 7, imageURL: "./images/7H.jpg"},
// {value: 8, imageURL: "./images/8H.jpg"},
// {value: 9, imageURL: "./images/9H.jpg"},
// {value: 10, imageURL: "./images/10H.jpg"}, 
// {value: 11, imageURL: "./images/JH.jpg"},
// {value: 12, imageURL: "./images/QH.jpg"},
// {value: 13, imageURL: "./images/KH.jpg"},

// {value: 1, imageURL: "./images/AS.jpg"},
// {value: 2, imageURL: "./images/2S.jpg"}, 
// {value: 3, imageURL: "./images/3S.jpg"},
// {value: 4, imageURL: "./images/4S.jpg"},
// {value: 5, imageURL: "./images/4S.jpg"},
// {value: 6, imageURL: "./images/6S.jpg"}, 
// {value: 7, imageURL: "./images/7S.jpg"},
// {value: 8, imageURL: "./images/8S.jpg"},
// {value: 9, imageURL: "./images/9S.jpg"},
// {value: 10, imageURL: "./images/10S.jpg"}, 
// {value: 11, imageURL: "./images/JS.jpg"},
// {value: 12, imageURL: "./images/QS.jpg"},
// {value: 13, imageURL: "./images/KS.jpg"},

// [{img.jpg: 10},
// {img.jpg: 10},
// {img.jpg: 10},
// {img.jpg: 10},
// ]


document.getElementById("deal-button").addEventListener('click', function(e){
    var x = document.createElement("img")
    x.setAttribute("src", deck[0])
    console.log(x)
    document.getElementById('dealer-hand').append(x)
    var y = document.createElement("img")
    y.setAttribute("src", deck[0])
    console.log(y)
    document.getElementById('dealer-hand').append(y)
    var i = document.createElement("img")
    i.setAttribute("src", deck[0])
    console.log(i)
    document.getElementById('player-hand').append(i)
    var n = document.createElement("img")
    n.setAttribute("src", deck[0])
    console.log(n)
    document.getElementById('player-hand').append(n)
})