import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  QuerySnapshot,
  QueryDocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
  }),

  actions: {
    init() {
      onSnapshot(collection(db, "bases"), (bases_snapshot: QuerySnapshot) =>{
        this.bases = bases_snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})) as BaseBeverageType[];

        if (!this.currentBase && this.bases.length >0){
          this.currentBase = this.bases[0];
        }
      });

      onSnapshot(collection(db, "creamers"), (creamers_snapshot: QuerySnapshot) =>{
        this.creamers = creamers_snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})) as CreamerType[];

        if (!this.currentCreamer && this.creamers.length >0){
          this.currentCreamer = this.creamers[0];
        }
      });

      onSnapshot(collection(db, "syrups"), (syrups_snapshot: QuerySnapshot) =>{
        this.syrups = syrups_snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})) as SyrupType[];

         if (!this.currentSyrup && this.syrups.length >0){
          this.currentSyrup = this.syrups[0];
        }
      });

      onSnapshot(collection(db, "beverages"), (beverages_snapshot: QuerySnapshot) =>{
        this.beverages = beverages_snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})) as BeverageType[];

         if (!this.currentBeverage && this.beverages.length >0){
          this.currentBeverage = this.beverages[0];
        }
      });
    },
    async makeBeverage() {
      if ((this.currentName.trim() === "") || (!this.currentBase || !this.currentCreamer || !this.currentSyrup))
        {
          return;
        }
      

      const db_ref = doc(collection(db, "beverages"))
      const drink: BeverageType=
      {
        id: db_ref.id,
        name: this.currentName,
        temp: this.currentTemp,
        base: this.currentBase,
        syrup: this.currentSyrup,
        creamer: this.currentCreamer,
      };
      await setDoc(db_ref, drink)
    },
    showBeverage(drink: BeverageType) {
      this.currentName = drink.name;
      this.currentTemp= drink.temp;
      this.currentBase=  drink.base;
      this.currentSyrup = drink.syrup;
      this.currentCreamer = drink.creamer;
    },
  },
});
