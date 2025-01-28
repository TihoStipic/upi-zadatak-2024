// Import necessary functions and classes
const {
  dohvatiLocalStorage,
  posaljiLocalStorage,
  Igrac,
  provjeriLozinku
} = require('./kod.js');
 // Mock funkcija za localStorage
 const localStorageMock = (() => {
    let store = {};
    return {
      getItem: key => store[key] || null,
      setItem: (key, value) => (store[key] = value.toString()),
      removeItem: key => delete store[key],
      clear: () => (store = {}),
    };
  })();
  
  // Postavljanje localStorage mock-a prije testova
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });
  
 
  
  describe('dohvatiLocalStorage function', () => {
    test('Ne postoji kljuc', () => {
      // Pozovi funkciju s nekim ne-postojećim ključem
      const result = dohvatiLocalStorage('nonExistentKey');
  
      // Očekujemo da funkcija vrati null
      expect(result).toBe(null);
    });
  
    test('Postoji kljuc', () => {
      // Postavi localStorage za testiranje
      const mockData = [{ name: 'John' }, { name: 'Jane' }];
      localStorage.setItem('existingKey', JSON.stringify(mockData));
  
      // Pozovi funkciju s postojećim ključem
      const result = dohvatiLocalStorage('existingKey');
  
      // Očekujemo da funkcija vrati ispravno parsiranu vrijednost
      expect(result).toEqual(mockData);
    });
  });

  describe('posaljiLocalStorage function', () => {
    test('Postavlja podatke u lokalnom spremniku', () => {
      // Pozovi funkciju s određenim ključem i vrijednošću
      posaljiLocalStorage('testKey', { value: 'testValue' });

      // Očekujemo da je postavljena vrijednost u localStorage
      expect(JSON.parse(localStorage.getItem('testKey'))).toEqual({ value: 'testValue' });

    });
  });

  
  describe('Igrac class', () => {
    test('Kreira igraca sa 0 bodova', () => {
      // Stvori novog igrača
      const player = new Igrac('John', 'john@example.com', 'password');
  
      // Očekujemo da je bodovima postavljeno na 0
      expect(player.bodovi).toBe(0);
    });
  
    test('Provjera da li igrac postoji', () => {
      // Postavi localStorage za testiranje
      const mockPlayers = [{ ime: 'John' }, { ime: 'Jane' }];
      localStorage.setItem('Igraci', JSON.stringify(mockPlayers));
  
      // Stvori igrača s imenom koje već postoji
      const existingPlayer = new Igrac('John', 'test@example.com', 'password');
  
      // Očekujemo da provjera vrati false jer igrač već postoji
      expect(existingPlayer.provjeri()).toBe(false);
    });
    test('Dodaje novog igraca', () => {
      // Postavi localStorage za testiranje
      const mockPlayers = [{ ime: 'John' }, { ime: 'Jane' }];
      localStorage.setItem('Igraci', JSON.stringify(mockPlayers));
  
      // Stvori novog igrača s jedinstvenim imenom
      const newPlayer = new Igrac('Alice', 'alice@example.com', 'password');
      newPlayer.dodaj();
  
      // Očekujemo da je novi igrač dodan u localStorage
      const updatedPlayers = JSON.parse(localStorage.getItem('Igraci'));
      expect(updatedPlayers).toContainEqual(newPlayer);
    });
  });
  describe('provjeriLozinku function', () => {
    test('Autorizira korisnika sa tocnim navedenim podacima', () => {
      // Postavi localStorage za testiranje
      const mockPlayers = [{ ime: 'John', lozinka: 'password123' }, { ime: 'Jane', lozinka: 'password456' }];
      localStorage.setItem('Igraci', JSON.stringify(mockPlayers));
  
      // Provjeri lozinku s ispravnim podacima
      const authorized = provjeriLozinku('John', 'password123');
  
      // Očekujemo da je autorizacija uspješna
      expect(authorized).toBe(true);
    });
  
    test('Ne autorizira kosnika sa krivim podacima', () => {
      // Postavi localStorage za testiranje
      const mockPlayers = [{ ime: 'John', lozinka: 'password123' }, { ime: 'Jane', lozinka: 'password456' }];
      localStorage.setItem('Igraci', JSON.stringify(mockPlayers));
  
      // Provjeri lozinku s netočnim podacima
      const authorized = provjeriLozinku('John', 'incorrectPassword');
  
      // Očekujemo da autorizacija nije uspješna
      expect(authorized).toBe(false);
    });
  });
  