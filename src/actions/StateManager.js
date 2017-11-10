let stateManager = null;
export default class StateManager{
    setReceiver(reciever){
        this.receivers.push(reciever);
    }
    receiveData(data) {
            for(i = 0 ; i < this.receivers.length ; i++) {
                try {
                    this.receivers[i].receiveData(data)
                }
                catch (error) {
            }
        }
    }
    constructor(){
        this.receivers=[];
    }
    static getInstance(){
        if(stateManager == null){
            stateManager = new StateManager()
        }
        return stateManager;
    }
}