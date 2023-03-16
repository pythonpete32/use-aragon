import { DaoListItem } from "use-aragon";
import { create } from "zustand";

const initialState: DaoListItem[] = [
  {
    address: "0x6f07aa7af27e0e06a08a1a17e04c4b0eb11300ab",
    ensDomain: "box.dao.eth",
    metadata: {
      name: "The DAO Box",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi, inventore atque cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi, inventore atque cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi, inventore atque cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi, inventore atque cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi, inventore atque cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi, inventore atque cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi, inventore atque cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi, inventore atque cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi, inventore atque cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi, inventore atque cupiditate.",
      avatar: "ipfs://QmeQx4GVNoUtNxUsPw8QFm4ZxR1kdYDZ6bzm7iYx3LLZkJ",
    },
    plugins: [
      {
        instanceAddress: "0x8eaf189dbe3524667d25684645aba1c71c02d8db",
        id: "token-voting.plugin.dao.eth",
        version: "0.0.1",
      },
    ],
  },
  {
    address: "0x2cc4fd795374114a2821870e88383d3aed067aa1",
    ensDomain: "testishere.dao.eth",
    metadata: {
      name: "this is test",
      description: "test here",
    },
    plugins: [
      {
        instanceAddress: "0x7f231309eb7eda1e0ec75f00535cea04348909ff",
        id: "token-voting.plugin.dao.eth",
        version: "0.0.1",
      },
    ],
  },
];

// Define a type for the state
type State = {
  daoList: DaoListItem[];
  addDao: (dao: DaoListItem) => void;
  removeDao: (address: string) => void;
  reset: () => void;
};

// Create a store with initial state and actions
export const useStore = create<State>((set) => ({
  daoList: initialState, // Initial state is an empty array

  // Add a new DaoListItem to the state
  addDao: (dao) =>
    set((state) => ({
      daoList: [...state.daoList, dao], // Append the new item to the existing array
    })),

  // Remove a DaoListItem by id from the state
  removeDao: (address) =>
    set((state) => ({
      daoList: state.daoList.filter((dao) => dao.address !== address), // Filter out the item with the matching address
    })),

  // Reset the state to the initial state
  reset: () => set({ daoList: initialState }),
}));
