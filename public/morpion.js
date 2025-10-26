
const caseSimple = document.querySelectorAll('#jeu .case');
const resultat = document.getElementById('resultat');
const buttonreset = document.getElementById('reset');
const tour = document.getElementById('tour');
const score = document.getElementById('score');
const buttonresetScore = document.getElementById('resetScore');
const buttonJouer = document.getElementById('jouer');
const acceuil = document.getElementById('acceuil');
const jeu = document.getElementById('jeu');
const buttonRetour = document.getElementById('retour');
const input1 = document.getElementById('name1');
const input2 = document.getElementById('name2');

// POUR LE ULTIME

const caseUltime = document.querySelectorAll('#jeu-ultime .caseUltime');
const grilleUltime = document.querySelectorAll('#jeu-ultime .grilleUltime');
const jeuUltime = document.getElementById('jeu-ultime');
const buttonJouerUltime = document.getElementById('jouerUltime');
const buttonRetourUltime = document.getElementById('retourUltime');
const tourUltime = document.getElementById('tourUltime');
const buttonresetUltime = document.getElementById('resetUltime');
const buttonresetScoreUltime = document.getElementById('resetScoreUltime');
const resultatUltime = document.getElementById('resultatUltime');
const scoreUltime = document.getElementById('scoreUltime');




let joueur1 = '';
let joueur2 = '';

let joueurUltime1 ='';
let joueurUltime2 = '';


let joueurActuel='joueur1';
let joueurUltimeActuel = 'joueurUltime1';


let combiVictoire = [ 
    [0, 1, 2],  
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],  
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let partieTerminee = false;

let partieUltimeTerminee = false;



let scoreX = 0;
let scoreO = 0;

let scoreUltimeX = 0;
let scoreUltimeO = 0;


jeu.style.display = 'none';
jeuUltime.style.display = 'none';


buttonJouer.disabled = true;
buttonJouerUltime.disabled = true;

let grilleCliquee = '';
let caseCliquee = '';

grilleUltime.forEach(function(grille) {
    grille.classList.remove("grilleActive");
});

let grilleActive = null;
let gagnantsPetitesGrilles = [null, null, null, null, null, null, null, null, null];

// Fonction général afficher le texte
function afficherTexte(lieu, texte){
    lieu.textContent = texte;
}
    
// Verifier les combinaisons pr voir si ca rentre dans les combi victoire
function verifCombi(i1,i2,i3){
    let case1 = caseSimple[i1].textContent;
    let case2 = caseSimple[i2].textContent;
    let case3 = caseSimple[i3].textContent;

    if(case1 == case2 && case2 == case3 && case1!=''){
        return true;
    }
    return false;
}




caseSimple.forEach(function(caseElement) {
    caseElement.addEventListener('click', function() {
        console.log("click");
        afficherTexte(score, "Score " + joueur1 +" : "+ scoreX + "-" + scoreO + " : Score " + joueur2);
        
        if(partieTerminee == true){
            return;
        }


        if(joueurActuel == 'joueur1'){
            
            if(caseElement.textContent == ''){
                caseElement.textContent = 'X';
                
            }      
            else{
                console.log("Deja coché")
            }
            verifVictoire();
            verifDraw();
            
            if(partieTerminee == true)
                joueurActuel = joueurActuel;
            else{
                joueurActuel = 'joueur2';

            }
            afficherTour();     
            
        }
        else{
            if(caseElement.textContent == ''){
                caseElement.textContent = '0';
            }      
            else{
                console.log("Deja coché")
            }
            verifVictoire();
            verifDraw();

            if(partieTerminee == true)
                joueurActuel = joueurActuel;
            else{
                joueurActuel = 'joueur1';

            }
            
            afficherTour();
            
        }

        
    });
});



// Verifier si y victoire
function verifVictoire(){
    combiVictoire.forEach(function(combi) {
        if(verifCombi(combi[0], combi[1], combi[2]) == true) {
            console.log("victoire")
            if(joueurActuel == 'joueur1') {
                afficherTexte(resultat, "Victoire pour " + joueur1 + " !");
            } 
            else {
                afficherTexte(resultat, "Victoire pour " + joueur2 + " !");
            }
            partieTerminee = true;
            
            if(joueurActuel == 'joueur1'){
                scoreX += 1;
                afficherTexte(score, "Score " + joueur1 +" : "+ scoreX + "-" + scoreO + " : Score " + joueur2);

            }
            else{
                scoreO += 1;
                afficherTexte(score, "Score " + joueur1 +" : "+ scoreX + "-" + scoreO + " : Score " + joueur2);

            }
         }
    });
}

// Verifier si y a match nul
function verifDraw(){
    let compteur = 0;
    caseSimple.forEach(function(caseElement){
        if(caseElement.textContent !=''){
            compteur += 1;
            
        
        }
    });
    if(compteur == 9 && partieTerminee == false){
        console.log("Match nul");
        afficherTexte(resultat, "Match nul");
        partieTerminee = true;

    }
    else{
        console.log("Pas fini");
        
    }
    
}

//Bouton pour reset la game
buttonreset.addEventListener('click', function(){
    console.log("reset");
    caseSimple.forEach(function(caseElement) {
        caseElement.textContent = ''; 
    })
    resultat.textContent = '';
    partieTerminee = false;
    if(joueurActuel == 'joueur1') {
        joueurActuel = 'joueur2';  
    } else {
        joueurActuel = 'joueur1';  
    }
    afficherTour();
})



//Bouton pour reset le score
buttonresetScore.addEventListener('click', function(){
    console.log("Score reset");
    scoreX = 0;
    scoreO = 0;
    afficherTexte(score, "Score " + joueur1 +" : "+ scoreX + "-" + scoreO + " : Score " + joueur2);

})

// Bouton pour l'entrer dans le jeu
buttonJouer.addEventListener('click',function(){

    console.log("Entre dans le jeu");
    joueur1 = name1.value;
    joueur2 = name2.value;
    acceuil.style.display = 'none';
    jeu.style.display = 'block';
    jeuUltime.style.display = 'none';

    afficherTexte(score, "Score " + joueur1 +" : "+ scoreX + "-" + scoreO + " : Score " + joueur2);


})

// Bouton retour à l'acceuil
buttonRetour.addEventListener('click', function(){
    console.log('Retour acceuil');
    acceuil.style.display = 'block';
    jeu.style.display = 'none';
    jeuUltime.style.display = 'none';

    // Pour tout remettre à 0 
    caseSimple.forEach(function(caseElement) {
        caseElement.textContent = ''; 
    })
    resultat.textContent = '';
    partieTerminee = false;
    joueurActuel = 'joueur1';
    scoreX = 0;
    scoreO = 0;


})

//Fonction qui permet de facilier l'affichage des tours
function afficherTour() {
    if(joueurActuel == 'joueur1') {
        afficherTexte(tour, "Au tour de " + joueur1 + " de jouer ! ");
    } else {
        afficherTexte(tour, "Au tour de " + joueur2 + " de jouer ! ");
    }
}


// Pour actriver le bouton jouer 
input1.addEventListener('input', function(){
    if(input1.value == '' || input2.value == ''){
        buttonJouer.disabled = true;
        buttonJouerUltime.disabled = true;
        buttonJouer2.disabled = true;
    }
    else{
        buttonJouer.disabled = false;
        buttonJouerUltime.disabled = false;
        buttonJouer2.disabled = false;
    }
})

input2.addEventListener('input', function(){
    if(input1.value == '' || input2.value == ''){
        buttonJouer.disabled = true;
        buttonJouerUltime.disabled = true;
    }
    else{
        buttonJouer.disabled = false;
        buttonJouerUltime.disabled = false;
    }
})


// Pour aller sur la page Morpion utlime
buttonJouerUltime.addEventListener('click', function(){
    console.log('Morpion ultime');

    joueurUltime1 = input1.value;
    joueurUltime2 = input2.value;

    acceuil.style.display = 'none';
    jeu.style.display = 'none';
    jeuUltime.style.display = 'block';

    afficherTexte(scoreUltime, joueurUltime1 + " : "+ scoreUltimeX +" - " + scoreUltimeO + " : " + joueurUltime2);
})

// Bouton retour depuis Morpion Ultime
buttonRetourUltime.addEventListener('click', function(){
    console.log('Retour acceuil');
    acceuil.style.display = 'block';
    jeu.style.display = 'none';
    jeuUltime.style.display = 'none';
    
    
    caseUltime.forEach(function(caseElement) {
        caseElement.textContent = ''; 
    })
    resultatUltime.textContent = '';
    partieTerminee = false;
    scoreUltimeX = 0;
    scoreUltimeO = 0;
    joueurUltimeActuel = 'joueurUltime1';
    gagnantsPetitesGrilles = [null, null, null, null, null, null, null, null, null];
    grilleActive = null;
    grilleUltime.forEach(function(grille) {
        grille.classList.remove("grilleActive");
    });
})

caseUltime.forEach(function(caseElement) {
    caseElement.addEventListener('click', function() {
        console.log("click");
        
        
        if(partieTerminee == true) {
            console.log("Partie déjà terminée !");
            return;  
        }
        
        //récupere le numero de la grille cliquée
        grilleCliquee = caseElement.parentElement.getAttribute('data-grille');

        //récupere le numero de la case cliquéé 
        caseCliquee = caseElement.getAttribute('data-case')
        
        //affiche dans la console les infos de la grill et la case cliquée
        console.log("Grille : " + grilleCliquee + ", Case : " + caseCliquee);

        /*verifie si partie deja terminée
        if(partieTerminee == true) {
            console.log("Partie déjà terminée !");
            grilleCliquee.classList.remove("grilleActive");
            return;  
        }
*/
        //vérifie que c'est la bonne grille qui est cliquée
        if(grilleActive != null && grilleCliquee != grilleActive) {
            console.log("Pas la bonne grille !");
             
            return;
        }

        if( gagnantsPetitesGrilles[grilleCliquee] != null){
            
            return;
        }

        //vérifie que la case soit vide 
        if(caseElement.textContent != ''){
            console.log("Deja coché");
            return;
        }

        //parcours les grilles et enleve le contour vert
        grilleUltime.forEach(function(grille) {
            grille.classList.remove("grilleActive");
        });
        

        // Si c joueur 1 alors on met X et on change joueur
        if(joueurUltimeActuel == 'joueurUltime1' ){
            
            caseElement.textContent = 'X';
            joueurUltimeActuel = 'joueurUltime2';
        
            // on met la bonne grille et on la colore
            grilleActive = caseCliquee; 
            if(gagnantsPetitesGrilles[grilleActive] != null) {
                grilleActive = null;  // null = jouer n'importe où
            }
            rendreGrilleColore(caseCliquee); 

            //on affiche a qui le tour
            afficherTourUltime();
            afficherTexte(scoreUltime, joueurUltime1 +" : "+ scoreUltimeX + "-" + scoreUltimeO + " : " + joueurUltime2);
        }
        else if(joueurUltimeActuel == 'joueurUltime2'){
            
            caseElement.textContent = '0';
            joueurUltimeActuel = 'joueurUltime1';
                
            grilleActive = caseCliquee; 
            if(gagnantsPetitesGrilles[grilleActive] != null) {
                grilleActive = null;  // null = jouer n'importe où
            }
            rendreGrilleColore(caseCliquee);      
            
            afficherTourUltime();
            afficherTexte(scoreUltime, joueurUltime1 +" : "+ scoreUltimeX + "-" + scoreUltimeO + " : " + joueurUltime2);
        }
        //on crée gagnant qui stocke soit X ou O ou null 
        
        let gagnant = verifVictoirePetiteGrille(grilleCliquee);
        if(gagnant != null) {
            gagnantsPetitesGrilles[grilleCliquee] = gagnant;
            GrilleGagneeColorie(grilleCliquee, gagnant);  // ← Déplacer ICI
            console.log(gagnantsPetitesGrilles);
        }
        console.log("La c le gagnant : ",gagnant);
        

        // si la grille n'est pas nulle alors on stocke dans gagnantsPetitesGrilles la grille gagnante pour verifie la victoire globale
        if(gagnant != null) {
            
            gagnantsPetitesGrilles[grilleCliquee] = gagnant;
            console.log(gagnantsPetitesGrilles);
            
        }
        //on met le gagnant de la partie Ultime dans gagnantUltime
        let gagnantUltime = verifVictoireUltime();
        

        if(gagnantUltime != null) {
            if(gagnantUltime == 'X') {
                
                scoreUltimeX = scoreUltimeX + 1;
                partieTerminee = true;
            } else {
                
                scoreUltimeO = scoreUltimeO + 1;
                partieTerminee = true;  
            }
            
            afficherTexte(resultatUltime, "Victoire pour " + gagnantUltime + " !");
            afficherTexte(scoreUltime, joueurUltime1 +" : "+ scoreUltimeX + "-" + scoreUltimeO + " : " + joueurUltime2);
            grilleUltime.forEach(function(grille) {
                grille.classList.remove("grilleActive");
            });
        }

        if(partieTerminee == true){
            console.log('PARTIE TERMINEEEEEEEEEEEEE ENFIN');
            return;
        }
       
        
    });
});

//Fonction qui permet de facilier l'affichage des tours
function afficherTourUltime() {
    if(joueurUltimeActuel == 'joueurUltime1') {
        afficherTexte(tourUltime, "Au tour de " + joueurUltime1 + " de jouer ! ");
    } 
    else {
        afficherTexte(tourUltime, "Au tour de " + joueurUltime2 + " de jouer ! ");
    }
}

buttonresetUltime.addEventListener('click',function(){
    console.log("resetULLTIMMEE");
    
    // Reset toutes les cases
    caseUltime.forEach(function(caseElement) {
        caseElement.textContent = ''; 
    })
    
    // Reset le résultat
    resultatUltime.textContent = '';
    
    // Reset l'état du jeu
    partieTerminee = false;
    joueurUltimeActuel = 'joueurUltime1';
    gagnantsPetitesGrilles = [null, null, null, null, null, null, null, null, null];
    grilleActive = null;
    
    // Enlever les contours verts
    grilleUltime.forEach(function(grille) {
        grille.classList.remove("grilleActive");
    });
    
    // Afficher le tour et le score
    afficherTourUltime();
    afficherTexte(scoreUltime, joueurUltime1 +" : "+ scoreUltimeX + "-" + scoreUltimeO + " : " + joueurUltime2);
})

//Bouton pour reset le score
buttonresetScoreUltime.addEventListener('click', function(){
    console.log("Score reset ULTIMEE");
    scoreUltimeX = 0;
    scoreUltimeO = 0;
    afficherTexte(scoreUltime, "Score " + joueurUltime1 +" : "+ scoreUltimeX + "-" + scoreUltimeO + " : Score " + joueurUltime2);

})

// Colorer la grille ou dois jouer le mec
function rendreGrilleColore(numeroGrille) {
    if(gagnantsPetitesGrilles[numeroGrille] == null) {
        grilleUltime[numeroGrille].classList.add("grilleActive");
    }
}

function verifVictoirePetiteGrille(numeroGrille) {
   
    //on stocke dans cases toutes les cases de la grille renseingé en parametre
    let cases = document.querySelectorAll('.grilleUltime[data-grille="' + numeroGrille + '"] .caseUltime');
    
    
    // pour toutes les combinaisons gagnantes on verifie si y a 3 symoble alignés et on le return, sinon null
    for(let i = 0; i < combiVictoire.length; i++) {
        let combi = combiVictoire[i];
        
        let case1 = cases[combi[0]].textContent; // ca va dans la grille et ca prend la case de la combinaison en mode si combi[0] c 0, on prend la valeur a l'emplacrement 0
        let case2 = cases[combi[1]].textContent;
        let case3 = cases[combi[2]].textContent;
        
        //on verifie ensuite si c pareil pr les trois cases de la combi 
        if(case1 == case2 && case2 == case3 && case1 != ''){
            console.log("LA GRILLE : ", numeroGrille, "a été gagné par ",case1);
            return case1;  
        }
    }
    
    
    return null;
}
function verifVictoireUltime() {
   
    console.log("Vérification victoire ultime...");  
    console.log("État des grilles :", gagnantsPetitesGrilles);  
        

    
    // pour toutes les combinaisons gagnantes on verifie si y a 3 symoble alignés et on le return, sinon null
    for(let i = 0; i < combiVictoire.length; i++) {
        let combi = combiVictoire[i];
        
        let Gcase1 = gagnantsPetitesGrilles[combi[0]]; // ca va dans la grille et ca prend la case de la combinaison en mode si combi[0] c 0, on prend la valeur a l'emplacrement 0
        let Gcase2 = gagnantsPetitesGrilles[combi[1]];
        let Gcase3 = gagnantsPetitesGrilles[combi[2]];

        console.log("Combi " + i + ":", Gcase1, Gcase2, Gcase3);
        
        //on verifie ensuite si c pareil pr les trois cases de la combi 
        if(Gcase1 == Gcase2 && Gcase2 == Gcase3 && Gcase1 != null){
            console.log("VICTOIRE !");
            console.log(Gcase1);
            return Gcase1;  
        }
    }
    
    
    return null;
}

//Cette fonction rempli la grille gagné avec le symbole gagnant pr que la grille soit plus claire quand elle est gagné 
function GrilleGagneeColorie(numeroGrille, gagnant){

    //Récupère les cases de la grille 
    let casesGrille = document.querySelectorAll('.grilleUltime[data-grille="' + numeroGrille + '"] .caseUltime');
    
    console.log('casesGrille:', casesGrille);
    
    //Parcours les cases pour mettre le symbole gagnant dans chaque
    casesGrille.forEach(function(caseElement) {
        
        caseElement.textContent = gagnant;
    }) 
}








// POUR LE MORPION 2

const cases2 = document.querySelectorAll('#jeu2 .case2');
const grille2 = document.getElementById('grille2');
const buttonJouer2 = document.getElementById('jouer2');
const jeu2 = document.getElementById('jeu2');
const buttonRetour2 = document.getElementById('retour2');
const buttonreset2 = document.getElementById('reset2');
const buttonresetScore2 = document.getElementById('resetScore2');
const score2 = document.getElementById('score2');
const resultat2 = document.getElementById('resultat2');
const tour2 = document.getElementById('tour2');


let joueur1_2 ='';
let joueur2_2 = '';

let joueurActuel2 = 'joueur1_2'

let partieTerminee2 = false;

jeu2.style.display = 'none';

let scoreX2 = 0;
let scoreO2 = 0;

let histCoupj1 = [];
let histCoupj2 = [];

let ancien = 0;

buttonJouer2.disabled = true;



// Bouton pour l'entrer dans le jeu
buttonJouer2.addEventListener('click',function(){

    console.log("Entre dans le jeu");
    joueur1_2= name1.value;
    joueur2_2 = name2.value;
    acceuil.style.display = 'none';
    jeu.style.display = 'none';
    jeu2.style.display = 'block';
    jeuUltime.style.display = 'none';

    afficherTexte(score2, "Score " + joueur1_2 +" : "+ scoreX2 + "-" + scoreO2 + " : Score " + joueur2_2);

})


buttonRetour2.addEventListener('click', function(){
    console.log('Retour acceuil');
    acceuil.style.display = 'block';
    jeu.style.display = 'none';
    jeu2.style.display = 'none';
    jeuUltime.style.display = 'none';

    // Pour tout remettre à 0 
    cases2.forEach(function(caseElement) {
        caseElement.textContent = ''; 
    })
    resultat2.textContent = '';
    partieTerminee2 = false;
    joueurActuel2 = 'joueur1';
    scoreX2 = 0;
    scoreO2 = 0;
    histCoupj1 = [];
    histCoupj2 = [];

})

//Bouton pour reset la game
buttonreset2.addEventListener('click', function(){
    console.log("reset");
    cases2.forEach(function(caseElement) {
        caseElement.textContent = ''; 
    })
    resultat2.textContent = '';
    partieTerminee2 = false;
    histCoupj1 = [];
    histCoupj2 = [];
    
    //Inverse le 1er joueur a jouer
    if(joueurActuel2 == 'joueur1_2') {
        joueurActuel2 = 'joueur2_2';  
    } 
    else {
        joueurActuel2 = 'joueur1_2';  
    }
    afficherTour();
})



//Bouton pour reset le score
buttonresetScore2.addEventListener('click', function(){
    console.log("Score reset");
    scoreX2 = 0;
    scoreO2 = 0;
    afficherTexte(score2, "Score " + joueur1_2 +" : "+ scoreX2 + "-" + scoreO2 + " : Score " + joueur2_2);

})


cases2.forEach(function(caseElement, index) {
    caseElement.addEventListener('click', function() {
        console.log("click case : ", index);
        
        afficherTexte(score2, "Score " + joueur1_2 +" : "+ scoreX2 + "-" + scoreO2 + " : Score " + joueur2_2);
         
        //Verif partie terminée
        if(partieTerminee2 == true){
            return;
        }

        cases2[index].classList.remove('grise1');
        cases2[index].classList.remove('grise2');


        if(joueurActuel2 == 'joueur1_2'){
            
            if(caseElement.textContent == ''){

                //ajoute la position du click dans historique
                histCoupj1.push(index);

                //Si taille historique = 4 ( ca veut dire je remplace le plus vieux coup)
                if(histCoupj1.length == 4 ){
                    ancien = histCoupj1[0];
                    histCoupj1.shift(); // supp le 1 er element d'une liste ( ici le plus vieux )

                    //faut supp visuelemment dcp 
                    cases2[ancien].textContent = '';
                    console.log("Case : ", ancien, "supp")
                }


                //Si taille historique = 3 ( soit on vient de jouer le 3eme soit on vient de supp le plus ancien)
                if(histCoupj1.length == 3){
                    // griseCase(histCoupj1[0]); // appelle une fonction a faire qui grise la case ou la démarque peut importe
                    cases2[histCoupj1[0]].classList.add('grise1');
                    
                }
                caseElement.textContent = 'X';
                
            }      
            else{
                console.log("Deja coché")
            }
            verifVictoire2();

            
            if(partieTerminee2 == true){
                joueurActuel2 = joueurActuel2;
            }
            else{
                joueurActuel2 = 'joueur2_2';

            }
            afficherTour2();     
            
        }
        else{
            if(caseElement.textContent == ''){

                //ajoute la position du click dans historique
                histCoupj2.push(index);

                //Si taille historique = 4 ( ca veut dire je remplace le plus vieux coup)
                if(histCoupj2.length == 4 ){
                    ancien = histCoupj2[0];
                    histCoupj2.shift(); // supp le 1 er element d'une liste ( ici le plus vieux )

                    //faut supp visuelemment dcp 
                    cases2[ancien].textContent = '';
                    console.log("Case : ", ancien, "supp")
                }


                //Si taille historique = 3 ( soit on vient de jouer le 3eme soit on vient de supp le plus ancien)
                if(histCoupj2.length == 3){
                    cases2[histCoupj2[0]].classList.add('grise2');
                }
                caseElement.textContent = '0';
                
            }      
            else{
                console.log("Deja coché")
            }
            verifVictoire2();

            if(partieTerminee2 == true)
                joueurActuel2 = joueurActuel2;
            else{
                joueurActuel2 = 'joueur1_2';

            }
            
            afficherTour2(); 
        }

    });
});

//Affiche le tour
function afficherTour2() {
    if(joueurActuel2 == 'joueur1_2') {
        afficherTexte(tour2, "Au tour de " + joueur1_2 + " de jouer ! ");
    } 
    else {
        afficherTexte(tour2, "Au tour de " + joueur2_2 + " de jouer ! ");
    }
}

function verifVictoire2(){
    combiVictoire.forEach(function(combi){
        if(verifCombi2(combi[0], combi[1], combi[2]) == true){
            console.log("Victoire pr :", joueurActuel2);
            if(joueurActuel2 == 'joueur1_2') {
                afficherTexte(resultat2, "Victoire pour " + joueur1_2 + " !");
            } 
            else {
                afficherTexte(resultat2, "Victoire pour " + joueur2_2 + " !");
            }
            partieTerminee2 = true;
            
            if(joueurActuel2 == 'joueur1_2'){
                scoreX2 += 1;
                afficherTexte(score2, "Score " + joueur1_2 +" : "+ scoreX2 + "-" + scoreO2 + " : Score " + joueur2_2);

            }
            else{
                scoreO2 += 1;
                afficherTexte(score2, "Score " + joueur1_2 +" : "+ scoreX2 + "-" + scoreO2 + " : Score " + joueur2_2);

            }
        }
    })
}

function verifCombi2(i1,i2,i3){
    let case1 = cases2[i1].textContent;
    let case2 = cases2[i2].textContent;
    let case3 = cases2[i3].textContent;

    if(case1 == case2 && case2 == case3 && case1!=''){
        return true;
    }
    return false;
}




/*

Si je stocke dans une lsite les postionsd des X , je devrais supprimer la 1ere a chaque foiset faire rentre la nouvelle



Des que le joueur a joué 3 fois, if(compteurdébut jeu  == 3) on stocke chaque coup dans hsitoriquecoupX ou O, on passe sur le mode 2 
        => on regarde si un des joueurs a gagné
        => si nan  on regarde le premier element de historiquecoupX ou O  et on grise et on el supprime
        => puis le joueur joue, on stocke son coup dans la liste
        => chaque coup on verif si y a victoire ( pas de nul possible car toujours des cases de libres)
        => on fais ca jusqua que victoire donne True, pr verif victoire, on verif si les cases dans historiquecoup sont un combianaison gagnante
        

*/


