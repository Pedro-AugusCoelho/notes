import * as S from './styled'

import BackgroundScreen from '@src/components/background-screen'

export default function Loading () {
    return (
        <BackgroundScreen>
            <S.BoxLoading>
                <S.Loading />
            </S.BoxLoading>
        </BackgroundScreen>
    )
}