export type Gift = {
  id: string;
  category: string;
  name: string;
  description: string;
  priceCents: number;
  image: string;
  imageAlt: string;
  featured?: boolean;
  pix: boolean;
  storeUrl?: string;
};

export const categories = [
  {
    "id": "cozinha",
    "label": "Cozinha",
    "icon": "pot"
  },
  {
    "id": "casa",
    "label": "Cama, mesa e banho",
    "icon": "bed"
  },
  {
    "id": "eletrodomesticos",
    "label": "Eletrodomésticos",
    "icon": "refrigerator"
  },
  {
    "id": "decoracao",
    "label": "Decoração",
    "icon": "vase"
  },
  {
    "id": "experiencias",
    "label": "Experiências",
    "icon": "sparkle"
  }
];

export const gifts: Gift[] = [
  {
    "id": "cafeteira",
    "category": "cozinha",
    "name": "Cafeteira Espresso",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 48990,
    "image": "cafe.webp",
    "imageAlt": "Ilustração de cafeteira espresso",
    "pix": true,
    "featured": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Cafeteira%20Espresso"
  },
  {
    "id": "lencois",
    "category": "casa",
    "name": "Jogo de Cama",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 27990,
    "image": "cama.webp",
    "imageAlt": "Ilustração de jogo de cama",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Jogo%20de%20Cama"
  },
  {
    "id": "tacas",
    "category": "casa",
    "name": "Conjunto de Taças",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 14990,
    "image": "tacas.webp",
    "imageAlt": "Ilustração de conjunto de taças",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Conjunto%20de%20Ta%C3%A7as"
  },
  {
    "id": "panelas",
    "category": "cozinha",
    "name": "Jogo de Panelas",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 38900,
    "image": "panelas.webp",
    "imageAlt": "Ilustração de jogo de panelas",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Jogo%20de%20Panelas"
  },
  {
    "id": "airfryer",
    "category": "cozinha",
    "name": "Air Fryer",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 42990,
    "image": "airfryer.webp",
    "imageAlt": "Ilustração de air fryer",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Air%20Fryer"
  },
  {
    "id": "jantar",
    "category": "experiencias",
    "name": "Jantar a Dois",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 22000,
    "image": "jantar.webp",
    "imageAlt": "Ilustração de jantar a dois",
    "pix": true
  },
  {
    "id": "cafe-viagem",
    "category": "experiencias",
    "name": "Café da Manhã com Vista",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 9500,
    "image": "cafe-viagem.webp",
    "imageAlt": "Ilustração de café da manhã com vista",
    "pix": true
  },
  {
    "id": "passeio",
    "category": "experiencias",
    "name": "Passeio de Veleiro",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 31000,
    "image": "passeio.webp",
    "imageAlt": "Ilustração de passeio de veleiro",
    "pix": true
  },
  {
    "id": "tacas-cristal",
    "category": "casa",
    "name": "Taças de Cristal",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 14990,
    "image": "tacas-cristal.webp",
    "imageAlt": "Ilustração de taças de cristal",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Ta%C3%A7as%20de%20Cristal"
  },
  {
    "id": "liquidificador",
    "category": "cozinha",
    "name": "Liquidificador",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 19990,
    "image": "liquidificador.webp",
    "imageAlt": "Ilustração de liquidificador",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Liquidificador"
  },
  {
    "id": "batedeira",
    "category": "cozinha",
    "name": "Batedeira",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 25990,
    "image": "batedeira.webp",
    "imageAlt": "Ilustração de batedeira",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Batedeira"
  },
  {
    "id": "sanduicheira",
    "category": "cozinha",
    "name": "Sanduicheira",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 12990,
    "image": "sanduicheira.webp",
    "imageAlt": "Ilustração de sanduicheira",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Sanduicheira"
  },
  {
    "id": "chaleira",
    "category": "cozinha",
    "name": "Chaleira Elétrica",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 15990,
    "image": "chaleira.webp",
    "imageAlt": "Ilustração de chaleira elétrica",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Chaleira%20El%C3%A9trica"
  },
  {
    "id": "torradeira",
    "category": "cozinha",
    "name": "Torradeira",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 18990,
    "image": "torradeira.webp",
    "imageAlt": "Ilustração de torradeira",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Torradeira"
  },
  {
    "id": "processador",
    "category": "cozinha",
    "name": "Processador de Alimentos",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 28990,
    "image": "processador.webp",
    "imageAlt": "Ilustração de processador de alimentos",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Processador%20de%20Alimentos"
  },
  {
    "id": "frigideira",
    "category": "cozinha",
    "name": "Frigideira Antiaderente",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 11990,
    "image": "frigideira.webp",
    "imageAlt": "Ilustração de frigideira antiaderente",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Frigideira%20Antiaderente"
  },
  {
    "id": "pressao",
    "category": "cozinha",
    "name": "Panela de Pressão",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 19990,
    "image": "pressao.webp",
    "imageAlt": "Ilustração de panela de pressão",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Panela%20de%20Press%C3%A3o"
  },
  {
    "id": "facas",
    "category": "cozinha",
    "name": "Jogo de Facas",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 14990,
    "image": "facas.webp",
    "imageAlt": "Ilustração de jogo de facas",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Jogo%20de%20Facas"
  },
  {
    "id": "tabua",
    "category": "cozinha",
    "name": "Tábua de Corte",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 7990,
    "image": "tabua.webp",
    "imageAlt": "Ilustração de tábua de corte",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=T%C3%A1bua%20de%20Corte"
  },
  {
    "id": "assadeiras",
    "category": "cozinha",
    "name": "Jogo de Assadeiras",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 13990,
    "image": "assadeiras.webp",
    "imageAlt": "Ilustração de jogo de assadeiras",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Jogo%20de%20Assadeiras"
  },
  {
    "id": "potes",
    "category": "cozinha",
    "name": "Potes Herméticos",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 9990,
    "image": "potes.webp",
    "imageAlt": "Ilustração de potes herméticos",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Potes%20Herm%C3%A9ticos"
  },
  {
    "id": "escorredor",
    "category": "cozinha",
    "name": "Escorredor de Louça",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 11990,
    "image": "escorredor.webp",
    "imageAlt": "Ilustração de escorredor de louça",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Escorredor%20de%20Lou%C3%A7a"
  },
  {
    "id": "utensilios",
    "category": "cozinha",
    "name": "Kit de Utensílios",
    "description": "Para preparar novas receitas e boas memórias.",
    "priceCents": 8990,
    "image": "utensilios.webp",
    "imageAlt": "Ilustração de kit de utensílios",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Kit%20de%20Utens%C3%ADlios"
  },
  {
    "id": "toalhas",
    "category": "casa",
    "name": "Jogo de Toalhas",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 19990,
    "image": "toalhas.webp",
    "imageAlt": "Ilustração de jogo de toalhas",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Jogo%20de%20Toalhas"
  },
  {
    "id": "edredom",
    "category": "casa",
    "name": "Edredom Casal",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 24990,
    "image": "edredom.webp",
    "imageAlt": "Ilustração de edredom casal",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Edredom%20Casal"
  },
  {
    "id": "travesseiros",
    "category": "casa",
    "name": "Par de Travesseiros",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 13990,
    "image": "travesseiros.webp",
    "imageAlt": "Ilustração de par de travesseiros",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Par%20de%20Travesseiros"
  },
  {
    "id": "cobre-leito",
    "category": "casa",
    "name": "Cobre-leito",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 22990,
    "image": "cobre-leito.webp",
    "imageAlt": "Ilustração de cobre-leito",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Cobre-leito"
  },
  {
    "id": "manta",
    "category": "casa",
    "name": "Manta para Sofá",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 11990,
    "image": "manta.webp",
    "imageAlt": "Ilustração de manta para sofá",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Manta%20para%20Sof%C3%A1"
  },
  {
    "id": "roupoes",
    "category": "casa",
    "name": "Par de Roupões",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 24990,
    "image": "roupoes.webp",
    "imageAlt": "Ilustração de par de roupões",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Par%20de%20Roup%C3%B5es"
  },
  {
    "id": "tapete-banho",
    "category": "casa",
    "name": "Tapete de Banheiro",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 5990,
    "image": "tapete-banho.webp",
    "imageAlt": "Ilustração de tapete de banheiro",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Tapete%20de%20Banheiro"
  },
  {
    "id": "jantar-louca",
    "category": "casa",
    "name": "Aparelho de Jantar",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 34990,
    "image": "jantar-louca.webp",
    "imageAlt": "Ilustração de aparelho de jantar",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Aparelho%20de%20Jantar"
  },
  {
    "id": "faqueiro",
    "category": "casa",
    "name": "Faqueiro",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 18990,
    "image": "faqueiro.webp",
    "imageAlt": "Ilustração de faqueiro",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Faqueiro"
  },
  {
    "id": "copos",
    "category": "casa",
    "name": "Jogo de Copos",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 7990,
    "image": "copos.webp",
    "imageAlt": "Ilustração de jogo de copos",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Jogo%20de%20Copos"
  },
  {
    "id": "xicaras",
    "category": "casa",
    "name": "Jogo de Xícaras",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 12990,
    "image": "xicaras.webp",
    "imageAlt": "Ilustração de jogo de xícaras",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Jogo%20de%20X%C3%ADcaras"
  },
  {
    "id": "toalha-mesa",
    "category": "casa",
    "name": "Toalha de Mesa",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 9990,
    "image": "toalha-mesa.webp",
    "imageAlt": "Ilustração de toalha de mesa",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Toalha%20de%20Mesa"
  },
  {
    "id": "jogo-americano",
    "category": "casa",
    "name": "Jogo Americano",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 8990,
    "image": "jogo-americano.webp",
    "imageAlt": "Ilustração de jogo americano",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Jogo%20Americano"
  },
  {
    "id": "guardanapos",
    "category": "casa",
    "name": "Guardanapos de Tecido",
    "description": "Um carinho para deixar nosso lar mais acolhedor.",
    "priceCents": 6990,
    "image": "guardanapos.webp",
    "imageAlt": "Ilustração de guardanapos de tecido",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Guardanapos%20de%20Tecido"
  },
  {
    "id": "geladeira",
    "category": "eletrodomesticos",
    "name": "Geladeira",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 289900,
    "image": "geladeira.webp",
    "imageAlt": "Ilustração de geladeira",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Geladeira"
  },
  {
    "id": "fogao",
    "category": "eletrodomesticos",
    "name": "Fogão",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 129900,
    "image": "fogao.webp",
    "imageAlt": "Ilustração de fogão",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Fog%C3%A3o"
  },
  {
    "id": "microondas",
    "category": "eletrodomesticos",
    "name": "Micro-ondas",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 64990,
    "image": "microondas.webp",
    "imageAlt": "Ilustração de micro-ondas",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Micro-ondas"
  },
  {
    "id": "lavadora",
    "category": "eletrodomesticos",
    "name": "Máquina de Lavar",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 189900,
    "image": "lavadora.webp",
    "imageAlt": "Ilustração de máquina de lavar",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=M%C3%A1quina%20de%20Lavar"
  },
  {
    "id": "lava-loucas",
    "category": "eletrodomesticos",
    "name": "Lava-louças",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 229900,
    "image": "lava-loucas.webp",
    "imageAlt": "Ilustração de lava-louças",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Lava-lou%C3%A7as"
  },
  {
    "id": "aspirador",
    "category": "eletrodomesticos",
    "name": "Aspirador de Pó",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 29990,
    "image": "aspirador.webp",
    "imageAlt": "Ilustração de aspirador de pó",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Aspirador%20de%20P%C3%B3"
  },
  {
    "id": "robo-aspirador",
    "category": "eletrodomesticos",
    "name": "Robô Aspirador",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 79990,
    "image": "robo-aspirador.webp",
    "imageAlt": "Ilustração de robô aspirador",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Rob%C3%B4%20Aspirador"
  },
  {
    "id": "ferro",
    "category": "eletrodomesticos",
    "name": "Ferro de Passar",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 13990,
    "image": "ferro.webp",
    "imageAlt": "Ilustração de ferro de passar",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Ferro%20de%20Passar"
  },
  {
    "id": "ventilador",
    "category": "eletrodomesticos",
    "name": "Ventilador",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 19990,
    "image": "ventilador.webp",
    "imageAlt": "Ilustração de ventilador",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Ventilador"
  },
  {
    "id": "ar-condicionado",
    "category": "eletrodomesticos",
    "name": "Ar-condicionado",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 199900,
    "image": "ar-condicionado.webp",
    "imageAlt": "Ilustração de ar-condicionado",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Ar-condicionado"
  },
  {
    "id": "smart-tv",
    "category": "eletrodomesticos",
    "name": "Smart TV",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 179900,
    "image": "smart-tv.webp",
    "imageAlt": "Ilustração de smart tv",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Smart%20TV"
  },
  {
    "id": "purificador",
    "category": "eletrodomesticos",
    "name": "Purificador de Água",
    "description": "Mais praticidade para o nosso dia a dia.",
    "priceCents": 59990,
    "image": "purificador.webp",
    "imageAlt": "Ilustração de purificador de água",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Purificador%20de%20%C3%81gua"
  },
  {
    "id": "luminaria",
    "category": "decoracao",
    "name": "Luminária de Mesa",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 14990,
    "image": "luminaria.webp",
    "imageAlt": "Ilustração de luminária de mesa",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Lumin%C3%A1ria%20de%20Mesa"
  },
  {
    "id": "vaso",
    "category": "decoracao",
    "name": "Vaso Decorativo",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 9990,
    "image": "vaso.webp",
    "imageAlt": "Ilustração de vaso decorativo",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Vaso%20Decorativo"
  },
  {
    "id": "quadros",
    "category": "decoracao",
    "name": "Conjunto de Quadros",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 15990,
    "image": "quadros.webp",
    "imageAlt": "Ilustração de conjunto de quadros",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Conjunto%20de%20Quadros"
  },
  {
    "id": "almofadas",
    "category": "decoracao",
    "name": "Kit de Almofadas",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 12990,
    "image": "almofadas.webp",
    "imageAlt": "Ilustração de kit de almofadas",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Kit%20de%20Almofadas"
  },
  {
    "id": "tapete",
    "category": "decoracao",
    "name": "Tapete para Sala",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 29990,
    "image": "tapete.webp",
    "imageAlt": "Ilustração de tapete para sala",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Tapete%20para%20Sala"
  },
  {
    "id": "cortina",
    "category": "decoracao",
    "name": "Cortina",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 19990,
    "image": "cortina.webp",
    "imageAlt": "Ilustração de cortina",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Cortina"
  },
  {
    "id": "espelho",
    "category": "decoracao",
    "name": "Espelho Decorativo",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 24990,
    "image": "espelho.webp",
    "imageAlt": "Ilustração de espelho decorativo",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Espelho%20Decorativo"
  },
  {
    "id": "relogio",
    "category": "decoracao",
    "name": "Relógio de Parede",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 8990,
    "image": "relogio.webp",
    "imageAlt": "Ilustração de relógio de parede",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Rel%C3%B3gio%20de%20Parede"
  },
  {
    "id": "velas",
    "category": "decoracao",
    "name": "Kit de Velas",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 7990,
    "image": "velas.webp",
    "imageAlt": "Ilustração de kit de velas",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Kit%20de%20Velas"
  },
  {
    "id": "planta",
    "category": "decoracao",
    "name": "Planta para a Casa",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 11990,
    "image": "planta.webp",
    "imageAlt": "Ilustração de planta para a casa",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Planta%20para%20a%20Casa"
  },
  {
    "id": "porta-retratos",
    "category": "decoracao",
    "name": "Porta-retratos",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 6990,
    "image": "porta-retratos.webp",
    "imageAlt": "Ilustração de porta-retratos",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Porta-retratos"
  },
  {
    "id": "abajur",
    "category": "decoracao",
    "name": "Abajur",
    "description": "Um detalhe especial para a nossa casa.",
    "priceCents": 17990,
    "image": "abajur.webp",
    "imageAlt": "Ilustração de abajur",
    "pix": true,
    "storeUrl": "https://www.amazon.com.br/s?k=Abajur"
  },
  {
    "id": "hospedagem",
    "category": "experiencias",
    "name": "Diária na Lua de Mel",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 45000,
    "image": "hospedagem.webp",
    "imageAlt": "Ilustração de diária na lua de mel",
    "pix": true
  },
  {
    "id": "spa",
    "category": "experiencias",
    "name": "Dia de Spa",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 35000,
    "image": "spa.webp",
    "imageAlt": "Ilustração de dia de spa",
    "pix": true
  },
  {
    "id": "piquenique",
    "category": "experiencias",
    "name": "Piquenique a Dois",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 15000,
    "image": "piquenique.webp",
    "imageAlt": "Ilustração de piquenique a dois",
    "pix": true
  },
  {
    "id": "passeio-cultural",
    "category": "experiencias",
    "name": "Passeio Cultural",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 18000,
    "image": "passeio-cultural.webp",
    "imageAlt": "Ilustração de passeio cultural",
    "pix": true
  },
  {
    "id": "transfer",
    "category": "experiencias",
    "name": "Transfer da Viagem",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 20000,
    "image": "transfer.webp",
    "imageAlt": "Ilustração de transfer da viagem",
    "pix": true
  },
  {
    "id": "sobremesa",
    "category": "experiencias",
    "name": "Sobremesa a Dois",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 6500,
    "image": "sobremesa.webp",
    "imageAlt": "Ilustração de sobremesa a dois",
    "pix": true
  },
  {
    "id": "brinde",
    "category": "experiencias",
    "name": "Brinde na Lua de Mel",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 12000,
    "image": "brinde.webp",
    "imageAlt": "Ilustração de brinde na lua de mel",
    "pix": true
  },
  {
    "id": "praia",
    "category": "experiencias",
    "name": "Dia de Praia",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 16000,
    "image": "praia.webp",
    "imageAlt": "Ilustração de dia de praia",
    "pix": true
  },
  {
    "id": "aventura",
    "category": "experiencias",
    "name": "Passeio de Aventura",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 28000,
    "image": "aventura.webp",
    "imageAlt": "Ilustração de passeio de aventura",
    "pix": true
  },
  {
    "id": "massagem",
    "category": "experiencias",
    "name": "Massagem Relaxante",
    "description": "Uma contribuição para momentos especiais a dois.",
    "priceCents": 24000,
    "image": "massagem.webp",
    "imageAlt": "Ilustração de massagem relaxante",
    "pix": true
  }
];

if (import.meta.env.DEV) {
  const experienciasComLink = gifts.filter(
    gift => gift.category === 'experiencias' && gift.storeUrl
  );

  const produtosSemLink = gifts.filter(
    gift => gift.category !== 'experiencias' && !gift.storeUrl
  );

  if (experienciasComLink.length) {
    console.warn(
      'Remova storeUrl destas experiências:',
      experienciasComLink.map(gift => gift.id)
    );
  }

  if (produtosSemLink.length) {
    console.warn(
      'Adicione storeUrl nestes produtos:',
      produtosSemLink.map(gift => gift.id)
    );
  }
}