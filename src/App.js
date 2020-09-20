import React from "react";
import { Menu } from "semantic-ui-react";
import BookList from "./BookList";

function App() {
  return (
    <div>
      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
        <BookList />
      </main>
    </div>
  );
}

export default App;
