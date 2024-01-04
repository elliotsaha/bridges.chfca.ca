import {connectToDatabase, logger} from '@lib';
import {Company, PartnerRequest} from '@models';
import {NextRequest} from 'next/server';
import {ServerResponse} from '@helpers';

export const GET = async (request: NextRequest) => {
  await connectToDatabase();

  try {
    const PARTNERSHIP_ID = request.nextUrl.searchParams.get('id');

    const PARTNER_REQUEST = await PartnerRequest.findById(PARTNERSHIP_ID);

    if (!PARTNER_REQUEST) {
      return ServerResponse.userError('Invalid ID');
    }

    switch (PARTNER_REQUEST.status) {
      case 'ACCEPT':
        return ServerResponse.userError('Request already accepted');
      case 'DENY':
        return ServerResponse.userError('Request already denied');
    }

    await PartnerRequest.findByIdAndUpdate(PARTNERSHIP_ID, {
      status: 'ACCEPT',
    });

    await Company.findByIdAndUpdate(PARTNER_REQUEST.to, {
      $push: {partners: PARTNER_REQUEST.from},
    });

    await Company.findByIdAndUpdate(PARTNER_REQUEST.from, {
      $push: {partners: PARTNER_REQUEST.to},
    });

    return ServerResponse.success('Successfully accepted request');
  } catch (e) {
    logger.error(e);
    return ServerResponse.serverError();
  }
};