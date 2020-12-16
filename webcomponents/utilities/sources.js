export const get_sources_for_profile = (profile = 'soft') => {

  const profiles = {
    'soft' : [
      'Tuttosport.com',
      'Tuttoandroid.net',
      'Corriere dello Sport',
      'Gazzetta.it',
      'Mediaset.it',
      'Gelocal.it',
      'Siviaggia.it',
      'Androidworld.it',
      'Lalaziosiamonoi.it',
      'Calcionews24.com'
    ],
    'medium' : [
      'Calcionews24.com',
      'Androidworld.it',
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
      'Ilmessaggero.it',
      'Ilgiornale.it',
      'Spaziogames.it',
      'Tuttojuve.com',
      'Lanazione.it',
      'Rollingstone.it',
      'Rainews.it',
      'Gazzetta.it',
      'Hwupgrade.it',
      'Mediaset.it',
      'Ilfattoquotidiano.it',
      'Gelocal.it',
      'Il Sole 24 Ore',
      'Siviaggia.it'
    ],
    'hard' : [
      'Lanazione.it',
      'Liberoquotidiano.it',
      'Lastampa.it',
      'La Repubblica',
      'Corriere.it',
      'Ilmessaggero.it',
      'Ilfattoquotidiano.it',
      'Ilgiornale.it',
      'Huffingtonpost.it',
      'ANSA.it',
      'Ilrestodelcarlino.it',
      'Rainews.it',
      'Il Sole 24 Ore',
    ]
  };
  return profiles[profile];

};