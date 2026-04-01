# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Pocessing lession React + Typescript

1. React Props & component
2. Render List Array data (map())
   -syntax
   ```` Arrays.map((array)=>{return(compunent(property: key:{value},property:{array.columnname}))})`

3. useState
4. useEffect
5. defined type ways
   - Variable Declarations Using a colon (:)
   - Type Alias (type)
   - Interface (interface)
6. Import layout (shadcn)
7. React Router (Layout Main and dashboard)
8. Render Data Table
   - data-table (table, table row)
   - columns (th) (property: ColumnDef,accessorKey, header)
   - Input data (td)
9. Making action button (adding, edit, view, delete)
10. All Filter logic
    - search
    - shorting
    - pagination
    -
11. Fetching API data
    - API URL Gives data
    - useEffect Fetches API data
    - useState Stores API data
    - columns Defines table structure & type
    - DataTable Renders UI
    - **(Important) checking CORS middleware in backend Express**
12. Setup TankStack Query
    - it is server state in your applications.It handles fetching, caching, synchronizing, and updating asynchronous data from APIs,
    - Install library

    ```sh
    npm i @tanstack/react-query

    npm i -D @tanstack/eslint-plugin-query
    ```

    - Follow Quick Tanstack Query
    - Setup Fetch API again that related with TankStack query

13. Search product Name & button in Product API
    - catch value user input using useState (the every keystroke(input) will: Update searchInput)
    - second useState for getting full keyinput
    - Click function (assing value from first to second useState)
    - assign parameter for fetch API
    - provide value (second useState) to TanStack query (qKey, qFn)
14. Create Product page with Frontend & Backend -  
     Color filed
15. Create Category page (CRUD Method)
    - Listing Data
      - column & Global data-table
      - API GET (create service Category)
      - useQuery (TanStack)
    - Create Method
      - form (input & Validation & toast)
      - Convert form modal (popup, sidebar)
      - API(POST)
      - uesMutation hook (TanStack)
16. Edit/Update Category list
    - columns (provide data row to page)
    - page(fn resign data, state store data)
    - open modals
    - send data to Form (pass data from state in page to form )
    - API (PUT)
    - uesMutation hook ( data refetch data)

    <a name="my-custom-anchor-point">Advance option Add/Edite. </a><br>

    ```
    Your structure is a 3-layer component flow:

    Page.  →   DrawerForm   → Form
    (parent)   (middle)      (child)
    ```

17. Delete Category list
    - columns (provide data row to page)
    - page(fn resign data, state store data)
    - Comfirm Modal
    - API service (DELETE)
    - uesMutation hook (set logic for create or update in form)
18. Search Feature in Product (Debounce)
    - setup Debounce library
    - making Input and catch value using input `onChange` event & useState
    - Apply debounce to delay the search request (using a debounce library)
    - past debounce value to TanStack Query hook (`queryKey` + `queryFn`) by parameter + type
    - Search parameter sent to backend API fetch
    - Bakend route receive the search query and filters products accordingly.
19. Pagintion Product
    - Create UI pagination component
    - Product page make
      - Set two useState (page & limite) in product for set default value assign to backend
      - Call backend object of pagination, this's inside (next,prev) pagination
      - Make row per page to assing pagination (limit) data
        - Design selection UI
        - set useState to onValueChange and set limit provide to backend
      - Result count (start, end, total Items)
      - Page Number pagination (currentPage, totalPage),
    - assing useState to Hook by parameter
    - past pagination (page & limite) to TanStack Query hook (`queryKey` + `queryFn`) by parameter + type
    - assign pagination(page & limite) parameter sent to backend API fetch
20. Sign In + Auth (JWT) from Backend
    - Make Form Sign in/up
    - Set up validation schema using Zod.
    - Use TanStack useForm with: defaultValues, validators, onSubmit handler
    - Fetch API (POST) to call Backend (auth service)
    - Use useMutation hook from TanStack Query for API requests.
    - Passing the mutation hook and parameters to the form component.
    - Check respon by log in API, Hook, Form. the backend must respone(accessToken, message)
    - Implement accessToken storage in LocalStorage: (Set, Get, Remove)
    - assign parameter to LocalStorage(Set) inside onSuccess (res?.accessToken, loading Toast)
    - After login, redirect the user to the dashboard or desired page.
    - Setup protect page if user without takon(LogIn)
      - tokan is get from localStorage
    - Error Sign in( Invalid email/password, not register)
21. API switch Fetch to Axios
    - Install Axios

    ```
    npm install axios
    ```

    - Create axios.ts in lib file
    - adding instances code of using global Axios
    - adding Request interceptor (handle globale Authorization )
    - adding Response interceptor (handle globale repsone from backend)
    - Changing Fetch to Axios API

22. Secssion Expire
    - backend authMiddleware respon status(401) or code "TOKEN_EXPIRED"
    - Axios Response Interceptor from backend
      - variable to get api respone (message, status, url, code)
      - set logic to remove log token and Redirect user to signin page (/sign-in?reason=session_expired)
      - make fallback logic to hide the real backend message
    - Make banner alert and set logic show in loginform

23. Building Upload File Image (POST)
    - Install CLI component layout File upload (block.so)
    - setup UI upload and preview image to ProductForm
    - sending upload file to backend by API(POST(id, file)) layer
      - using formData, and header (type)
    - assign parameter API to uploadImage hook (uesMutation) in Product Hook
    - On Place Condition Hook CreateProduct
      - Log repsonse after Success Create product
      - Catching PorductId to set condition if have/not
      - If having, Using forEach for handle many upload images
      - Push images Hook (uploadImage) again to backend after finish create product
      - Clear render to empty after success Create image
    - Display image in columns
      - Make relationship in backend
      - Defined product image type
      - Check frontend get API by using (log network)
      - Display image in columns

      <a name="my-custom-anchor-point">Explain Flow Creat + Image </a><br>

    ```
    Adding Product in Form (Current process)
      1. First API call For Create Product (success next step)
      2. Second API call For Upload images(loop)
    ```

24. Building Edit File Image (PUT)
    - check/log productform get Image from Backend API
    - Add UI Preview Edit Upload Image file getting from backend API
      - render All images using .Map()
    - Set logic to display or not
    - On Place Condition Hook UpdateProduct
      - Log repsonse after Success Upload product
      - Catching PorductId to set condition if have/not
      - If having, Using forEach/Map for handle many upload images in Update (one by one)
      - Using the same Push images Hook (uploadImage) again to backend after finish create product
      - Clear render to empty after success Update
25. Building Delete File Image while Edit product
    - Frontend working
      - Create State(Array) for storage delete image Ids
      - Make Arrow function for update state to stores image Ids when user click delete button

      ```TypeScript
      //Noted it'll only have mark as delete
      const handleDeleteImage = (id: number) => {
      setDeleteImageIds((prev) => [...prev, id]);
      };
      ```

      - set logic to re-render UI that not include StateDelete(Ids) using ( .filter() )
      - log check StatDelete(Ids) in condition hook Update Product
      - Take StatDelete(Ids) to re-render delete one by one using (forEach/Map)
      - Create TanStack mutation hook
      - API service (DELETE)

26. ## Building Delete File Image (Delete)

# react-typescript-admin-template
