import { gql } from "apollo-server-express";

export const type = gql`
    enum EffectType {
        INNER_SHADOW
        DROP_SHADOW
        LAYER_BLUR
        BACKGROUND_BLUR
    }

    type Effect {
        # Type of effect
        type: EffectType

        # Is the effect active?
        visible: Boolean

        # Radius of the blur effect (applies to shadows as well)
        radius: Float

        # The following properties are for shadows only:
        # The color of the shadow
        color: Color

        # Blend mode of the shadow
        blendMode: BlendMode

        # How far the shadow is projected in the x and y directions
        offset: Position
    }
`;

export const resolvers = {};
