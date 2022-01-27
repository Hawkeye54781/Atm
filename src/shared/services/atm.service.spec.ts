import { TestBed } from '@angular/core/testing';
import { AtmService, NoteNames } from './atm.service';

describe('AtmService', () => {
  let service: AtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtmService],
    });
    service = TestBed.inject(AtmService);
  });

  it('should be created', () => {
    const service: AtmService = TestBed.inject(AtmService);
    expect(service).toBeTruthy();
  });

  it('should get atmDetails', () => {
    const expectedAtmDetails = {
      totalCash: 1500,
      accounts: [
        {
          id: '123456789',
          pin: '1234',
          balance: 800,
          overDraft: 200,
        },
        {
          id: '987654321',
          pin: '4321',
          balance: 1230,
          overDraft: 150,
        },
      ],
      Notes: [
        {
          name: NoteNames.FIFTY,
          amount: 10,
        },
        {
          name: NoteNames.TWENTY,
          amount: 30,
        },
        {
          name: NoteNames.TEN,
          amount: 30,
        },
        {
          name: NoteNames.FIVE,
          amount: 20,
        },
      ],
    };

    service.getAtmDetails().subscribe((atmDetails) => {
      expect(atmDetails).toEqual(expectedAtmDetails);
    });
  });

  it('should get accountDetails', () => {
    const service: AtmService = TestBed.inject(AtmService);
    const expectedAccountDetails = {
      id: '',
      pin: '',
      balance: 0,
      overDraft: 0,
    }
    service.getAccountDetails().subscribe((accountDetails) => {
      expect(accountDetails).toEqual(expectedAccountDetails);
    });

  });

});
