import { HttpClient } from "@angular/common/http";
import { HttpService } from "./http.service"
import { of } from "rxjs";

describe('Get service', () => {
  let httpCLientSpy: jasmine.SpyObj<HttpClient>
  let httpService: HttpService;
  const dummyData = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' }
  ];
  beforeEach(() => {
    httpCLientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    httpService = new HttpService(httpCLientSpy);
  })

  describe('getUsersApi()', () => {
    it('Should return the expected JSON when the getMethod method is called.', () => {
      httpCLientSpy.get.and.returnValue(of(dummyData));
      httpService.getUsersApi().subscribe({
        next: (value) => {
          expect(value).toEqual(dummyData)
        },
        error: () => { },
      });
      expect(httpCLientSpy.get).toHaveBeenCalledTimes(1);
    })

  })
})