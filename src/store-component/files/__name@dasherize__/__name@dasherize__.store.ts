import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { of } from 'rxjs';

<% if (storeMethods == '') {%>
export interface <%= classify(name) %>State {
    
}
<% } else if (storeMethods == 'default') {%>
export interface <%= classify(name) %>State {
      
}

export interface <%= classify(name) %> {
      
}
<% } else {%>
export interface <%= classify(storeMethods) %>State {
      
}
    
export interface <%= classify(storeMethods) %> {
          
}
<% }%>

@Injectable({
  providedIn: 'root'
})
<% if (storeMethods == '' || storeMethods == 'default') {%>
export class <%= classify(name) %>Store extends ObservableStore<<%= classify(name) %>State> {
<% } else {%>
export class <%= classify(name) %>Store extends ObservableStore<<%= classify(storeMethods) %>State> {
<% }%>
  constructor() { 
    super({ trackStateHistory: true, logStateChanges: true });

    const initialState = {};
    <% if (storeMethods == '' || storeMethods == 'default') {%>
    this.setState(initialState, <%= classify(name) %>StoreActions.Initialize<%= classify(name) %>s);
    <% } else {%>
     this.setState(initialState, <%= classify(name) %>StoreActions.Initialize<%= classify(storeMethods) %>s);
    <% }%>
  }

  <% if(storeMethods == '') {%>
  <%} else if (storeMethods == 'default') {%>
    get<%= classify(name) %>() {
        return of(this.getState());
    }
    
    add<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>) {
    
        this.setState({}, <%= classify(name) %>StoreActions.Add<%= classify(name) %>);
    }
    
    update<%= classify(storeMethods) %>(<%= camelize(name) %>: <%= classify(name) %>) {
        this.setState({}, <%= classify(name) %>StoreActions.Update<%= classify(name) %>);
    }
  <% } else {%>
    get<%= classify(storeMethods) %>() {
        return of(this.getState());
    }
    
    add<%= classify(storeMethods) %>(<%= camelize(storeMethods) %>: <%= classify(storeMethods) %>) {
    
        this.setState({}, <%= classify(storeMethods) %>StoreActions.Add<%= classify(storeMethods) %>);
    }
    
    update<%= classify(storeMethods) %>(<%= camelize(storeMethods) %>: <%= classify(storeMethods) %>) {
        this.setState({}, <%= classify(storeMethods) %>StoreActions.Update<%= classify(storeMethods) %>);
    }
  <% }%>
}

<% if (storeMethods == '') {%>
export enum <%= classify(name) %>StoreActions {
    Initialize<%= classify(name) %>s = 'INITIALIZE_<%= touppercase(name) %>_STORE'
     
}
<% } else if(storeMethods == 'default') {%>
export enum <%= classify(name) %>StoreActions {
    Initialize<%= classify(name) %>s = 'INITIALIZE_<%= touppercase(name) %>_STORE',
    Add<%= classify(name) %> = 'ADD_<%= touppercase(name) %>',
    Update<%= classify(name) %> = 'UPDATE_<%= touppercase(name) %>'
}
<% } else {%>
export enum <%= classify(storeMethods) %>StoreActions {
    Initialize<%= classify(storeMethods) %>s = 'INITIALIZE_<%= touppercase(storeMethods) %>_STORE',
    Add<%= classify(storeMethods) %> = 'ADD_<%= touppercase(storeMethods) %>',
    Update<%= classify(storeMethods) %> = 'UPDATE_<%= touppercase(storeMethods) %>'
}
<% } %>