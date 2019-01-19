export const createData = async models => {
  const user1 = await models.User.create({
    username: 'andersnylund',
    email: 'anders.nylund.an@gmail.com',
    password: 'verysecretpassword',
  });

  const user2 = await models.User.create({
    username: 'jdoe',
    email: 'john.doe@example.com',
    password: 'john.doe',
  });

  const item1 = await models.Item.create({
    title: 'Used laptop',
    description: 'MacBook Pro 15" i7',
    price: 1000,
    image:
      'https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png',
    largeImage:
      'https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png',
    userId: user1.id,
  });

  const item3 = await models.Item.create({
    title: 'Bike',
    description: 'Tunturi',
    price: 60,
    image:
      'https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png',
    largeImage:
      'https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png',
    userId: user1.id,
  });

  const item2 = await models.Item.create({
    title: 'Lumilinko',
    description: 'Malli: Honda HS970. Työleveys 70cm.',
    price: 1850,
    image:
      'https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png',
    largeImage:
      'https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png',
    userId: user2.id,
  });

  const item4 = await models.Item.create({
    title: 'Martela Picco-tuoli, useita',
    description:
      'Martela Picco-tuoli. Käsinojilla. Harmaa verhoilu, harmaat metalliosat, pyökkiset puuosat. VK178 ',
    price: 75,
    image:
      'https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png',
    largeImage:
      'https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png',
    userId: user2.id,
  });

  await models.Item.create({
    title: 'Lumilauta Burton (Lauta,siteet ja monot)',
    description:
      'Lumilautasetti Burton Chopper 120. Sisältää helppokäyttöiset burton siteet, monot burton nro. 34. Lauta ollut käytössä 10 päivää ja on hyvässä kunnossa ',
    price: 200,
    image:
      'https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png',
    largeImage:
      'https://res.cloudinary.com/andersnylund/image/upload/v1547367037/handel/ba06tzvclzwqz9jkpr7l.png',
    userId: user2.id,
  });

  await models.Offer.create({
    makerId: item1.id,
    receiverId: item2.id,
    type: 'ACCEPT',
  });

  await models.Offer.create({
    makerId: item2.id,
    receiverId: item1.id,
    type: 'ACCEPT',
  });

  await models.Offer.create({
    makerId: item3.id,
    receiverId: item2.id,
    type: 'ACCEPT',
  });

  await models.Offer.create({
    makerId: item2.id,
    receiverId: item3.id,
    type: 'ACCEPT',
  });
};

export default { createData };
