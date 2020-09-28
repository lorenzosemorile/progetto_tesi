export const get_sources_for_profile = (profile = 'soft') => {

  const profiles = {
    'soft' : [
      'Fanpage.it',
      'Multiplayer.it',
      'Tuttosport.com',
      'Tuttoandroid.net',
      'Corriere dello Sport',
      'Corriere.it',
      'Huffingtonpost.it',
      'ANSA.it',
      'Leggo.it',
      'Orizzontescuola.it',
      'Rainews.it',
      'Gazzetta.it',
      'Hwupgrade.it',
      'Mediaset.it',
      'Gelocal.it',
      'Siviaggia.it'
    ],
    'medium' : [
      'Fanpage.it',
      'Multiplayer.it',
      'Tuttosport.com',
      'Liberoquotidiano.it',
      'Tuttoandroid.net',
      'Lastampa.it',
      'La Repubblica',
      'Corriere dello Sport',
      'Corriere.it',
      'Huffingtonpost.it',
      'ANSA.it',
      'Ilrestodelcarlino.it',
      'Leggo.it',
      'Orizzontescuola.it',
      'Rainews.it',
      'Gazzetta.it',
      'Hwupgrade.it',
      'Mediaset.it',
      'Gelocal.it',
      'Il Sole 24 Ore',
      'Siviaggia.it'
    ],
    'hard' : [
      'Liberoquotidiano.it',
      'Lastampa.it',
      'La Repubblica',
      'Corriere.it',
      'Huffingtonpost.it',
      'ANSA.it',
      'Ilrestodelcarlino.it',
      'Rainews.it',
      'Il Sole 24 Ore',
    ]
  };
  return profiles[profile];

};