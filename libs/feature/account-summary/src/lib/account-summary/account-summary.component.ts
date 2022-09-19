/**
 * TODO: 10. Angular (NX) Architecture
 * TODO: 11. Asynchronous Programming (RxJS)
 */
import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Account } from 'libs/shared/services/src/lib/account';
import { AccountService } from 'libs/shared/services/src/lib/account.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'sum-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
})
export class AccountSummaryComponent implements OnInit {
  accounts$: Observable<Account[]> = of([]);
  constructor(private accountService: AccountService) {}
  accounts: Account[] = [];
  accountsFilter = '';
  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
      this.accounts$ = of(accounts);
    });
  }

  accountsChange() {
    this.filterAccounts(this.accounts);
  }

  filterAccounts(accounts: Account[]) {
    this.accounts$ = of(
      accounts.filter(
        (account: any ) =>{
          return this.accountsFilter === account.currency  || this.accountsFilter === '';

        }
      )
    );
  }
}
