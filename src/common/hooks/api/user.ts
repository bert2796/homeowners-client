import { useMutation } from '@tanstack/react-query';

import { MeEditParams, MePasswordEditParams } from '../../../types';
import { userAPI } from '../../services';

export const useEditMe = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: Partial<MeEditParams>) => userAPI.editMe(params),
    // onMutate: async () => {
    //   await queryClient.cancelQueries({ queryKey: ['getMes'] });

    //   const previousData = queryClient.getQueryData(['getMes']);

    //   return previousData;
    // },
    // onSuccess: (res) => {
    //   if (res?.data) {
    //     queryClient.setQueryData(['getMe', id], () => res.data);
    //     queryClient.invalidateQueries(['getMes']);
    //   }
    // },
  });
};

export const useEditMePassword = () => {
  return useMutation({
    mutationFn: (params: MePasswordEditParams) =>
      userAPI.editMePassword(params),
  });
};
