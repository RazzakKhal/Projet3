import { User } from "./user";

export class Like {

    private id: number | undefined;
    private likeSender: User;
    private likeReceiver: User;

    constructor(likeSender: User, likeReceiver: User) {

        this.likeSender = likeSender;
        this.likeReceiver = likeReceiver;
    }

    getId(): number | undefined {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getLikeSender(): User {
        return this.likeSender;
    }

    setLikeSender(likeSender: User) {
        this.likeSender = likeSender;
    }

    getLikeReceiver(): User {
        return this.likeReceiver;
    }

    setLikeReceiver(likeReceiver: User) {
        this.likeReceiver = likeReceiver;
    }
}

