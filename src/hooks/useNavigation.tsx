import {StackParamList} from '@/const/routesNames';
import {
  NavigationProp,
  useNavigation as useReactNavigation,
} from '@react-navigation/native';

export const useNavigation = () => {
  const navigation = useReactNavigation<NavigationProp<StackParamList>>();

  return navigation;
};
