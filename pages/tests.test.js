// Import necessary functions and classes
const {
  dohvatiLocalStorage,
  posaljiLocalStorage,
  Igrac,
  provjeriLozinku
} = require('E:/UPI/kviz_upi/pages/kod.js');
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
    test('Nema kljuca', () => {
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

  
  describe('Igrac class', () => {
  
    test('dodaje novog igraca', () => {
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
  