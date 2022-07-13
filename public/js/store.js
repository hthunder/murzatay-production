import { BehaviorSubject, Subject } from "rxjs"
import { scan, distinctUntilKeyChanged, map } from "rxjs/operators"

export class ObservableStore {
    constructor(initialState) {
        this._store = new BehaviorSubject(initialState)
        this._stateUpdates = new Subject()

        this._stateUpdates
            .pipe(
                // scan - it's like reduce, but emits the current accumulation state
                // after each update
                scan((acc, cur) => {
                    return { ...acc, ...cur }
                    // initialValue is called a seed
                }, initialState)
            )
            .subscribe(this._store)
    }

    updateState(stateUpdate) {
        this._stateUpdates.next(stateUpdate)
    }

    selectState(stateKey) {
        return this._store.pipe(
            // Returns an Observable that emits all items emitted by the source Observable
            // that are distinct by comparison from the previous item,
            // using a property accessed by using the key provided
            // to check if the two items are distinct.
            distinctUntilKeyChanged(stateKey),
            map((state) => state[stateKey])
        )
    }

    stateChanges() {
        // Creates a new Observable with this Subject as the source.
        // You can do this to create customize Observer-side logic of the Subject
        // and conceal it from code that uses the Observable.
        return this._store.asObservable()

        // What is a subject?
        // An RxJS Subject is a special type of Observable that allows values to be multicasted
        // to many Observers. While plain Observables are unicast
        // (each subscribed Observer owns an independent execution of the Observable),
        // Subjects are multicast.
    }
}
