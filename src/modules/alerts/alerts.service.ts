import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Alert, AlertDocument } from './entities/alert.entity';
import { Model } from 'mongoose';
import * as firebase from 'firebase-admin';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import * as shell from 'shelljs';

export interface ISendFirebaseMessages {
  token: string;
  title?: string;
  message: string;
}

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name) private alertsModel: Model<AlertDocument>,
  ) {
    firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: 'kolonykeeper',
        clientEmail:
          'firebase-adminsdk-r4sdp@kolonykeeper.iam.gserviceaccount.com',
        privateKey:
          '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJwixw/yGBXtk0\nsJe6dF3yP17FkTHhTPVjIgvvkeVbJtISlVzRUNpPAYAl0viPwMMNgdUgUAcdgULA\njVKa4gVwgDTT4+THluOTeDAKkxXZX5rObWYnKcQfxNZEmJDSLxsceu3wtqD1HjVE\n+SmwJHO69qZf3+xE+Im/NH0cxDJOoS6HvSJW7PbhXEVZLnhle6sldzLkatTo13Ld\naZFdY24A8Tiov35mRvCJJZL97MXZiWx5Ogre6L6ENNs1DcI/yls8PHlJnwCRh3H6\nWWHZabuc2fe/uxm+qNcFM4IFO0K/V9z7FPkVutZzLKjrLWy8NKsd3o4Xf1sVBMne\nw3NgcVBRAgMBAAECggEAWVD05JcFaaSoCkvM95VxS38jQNoMl10+2oJlf0p6mvYe\nFGz72IvvAP+8j8IMGHNwxed+hp328GhbOSu28GrzloCjIlRmYLcbCxsvRVck2oSY\n3x6OFPNH5/p3Eonpvqps2ZhQAnqO2cRkN6MIAfq5IwDy2UmjaksOi888PcJbNPQb\ni2ziG2s7FWCzm5thNHEFxP70lBf7uoDfI4pgFVNZK0FsItgWT+c4duawTD6zi93t\nH+WCILXg/mljhbuERDVuK8MvexNA3y8YlSPPGAZ8HYgu/CzNj0PBbFDVNhO54mcX\nmN9cGABaygMYiYBmBNQdDyXfySPmX8Qd+l331pmxqwKBgQDmvXp9L/cK3DENmeyO\ne4QHPE/X4tpFSt7QmbLTKm58VLIdO6k2igEwG0rZNTPD1ay1TMNCY2is9rO0nk++\nfP6Cd+7WMlOTqQMr7CqMsUVNi3fmFQ9wErwjEvi4/tk74MXPRVFLrIPt2866qP/J\nB5xSryo0FGu0djrnwQRHBudHowKBgQDf2HsBuokRPOo7EQgwsOpIm0OjtG96UQtr\nHdwUZ9e/Bf4OBBqmyWpu7VtRPrE341nnLBZ662B/6wY+rlz4gjRWy5In8IeZhHfw\nqCDGODfyaUhwr9R2Pdc6hGAtAOvqmw9Z7P4oRSk1AsVhWuYPjnmmA2Pmvy9YG/Q8\nOq4wp7jXewKBgGbJ4+Ye1vOckbGYb1wtw+whPwRSR5/0sXvF7HbLgTqb1FjXehMU\nuWC/18EZRT0pU+3UC2vosvnSUM3WdHnMXuiqGtiKxNaTxRjs9SuF0PSxe7Egkqb/\ngZYyXmCzDvzwrc4e+A85A/CTKe3XWVMps8bVx3w52J0kyirxvkER3zf3AoGAFBqf\nQZJ9SP0NlGx9LdJV2FuJgaRs9rFcsywlXffNmqxxGtUnh59DXd8Xen6E8B4NLwP4\nqOWG7zYug2aplvAqvzjdUZT6uMD6/LQ87VCTRcRK60P/cvcu42SMNr6Ecbenc04j\nrX44qzgqfgnp66/CITTgvhKhr+oiz1390wTdRw0CgYBmOOCrXH0P8k9n+jK2aZPE\nVG1TZkb4B5ak7ZLNrcEjmF6vAxoYXUS0//EE25azsJPta/1Hejd22GJrCTQCLXOp\nSZNvkGZ+btOZFOD4N/RpI/p1PHeiCCkhRrVEYj2wRxvLk9i9APyYOBbweZ4hXvOL\nzDDogS104k9kCFh/BD3m6Q==\n-----END PRIVATE KEY-----\n',
      }),
    });
  }

  async create(createAlertDto: CreateAlertDto): Promise<Alert> {
    const alert = new this.alertsModel(createAlertDto);
    return await alert.save();
  }

  async findAll(): Promise<Alert[]> {
    return await this.alertsModel.find();
  }

  async findOne(_id: string): Promise<Alert> {
    const alert = await this.alertsModel.findOne({ _id });
    if (!alert) throw new ForbiddenException(`alert with the _id ${_id} not found`);
    return alert;
  }

  async update(_id: string, updateAlertDto: UpdateAlertDto): Promise<Alert> {
    await this.findOne(_id);
    if (
      (await this.alertsModel.updateOne({ _id }, updateAlertDto))
        .modifiedCount == 0
    )
      throw new ForbiddenException('alert not modified');
    return await this.findOne(_id);
  }

  async remove(_id: string): Promise<boolean> {
    await this.findOne(_id);
    if ((await this.alertsModel.deleteOne({ _id })).deletedCount == 0)
      throw new ForbiddenException('alert not delete');
    return true;
  }

  async sendNotification(token: any, title: string, body: string): Promise<void> {
    try {
      await firebase
        .messaging()
        .send({
          notification: { title, body },
          token: token,
          android: { priority: 'high' },
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      return error;
    }
  };
}
