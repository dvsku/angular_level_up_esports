import { trigger, animate, transition, style, query } from '@angular/animations';

// USED FOR ROUTER-OUTLET CHANGES
export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 }), { optional: true }),
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        query(':leave', [style({ opacity: 1, height: '100%' }), animate('0s', style({ opacity: 0 }))], {
            optional: true
        }),
        query(':enter', [style({ opacity: 0, height: '100%' }), animate('0.75s', style({ opacity: 1 }))], {
            optional: true
        })
    ])
]);

export const fadeAnimationChild = trigger('fadeAnimationChild', [
    transition('* => *', [
        query(
            ':enter, :leave',
            style({ position: 'absolute', top: 0, left: 0, right: 0, 'padding-left': '15px', 'padding-right': '15px' }),
            { optional: true }
        ),
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        query(':leave', [style({ opacity: 1, height: '100%' }), animate('0.3s', style({ opacity: 0 }))], {
            optional: true
        }),
        query(':enter', [style({ opacity: 0, height: '100%' }), animate('0.3s', style({ opacity: 1 }))], {
            optional: true
        })
    ])
]);

export const loaderFadeOut = trigger('loaderFadeOut', [
    /* transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('1s ease-out', style({ height: 300, opacity: 1 }))
    ]), */
    transition(':leave', [style({ opacity: 1 }), animate('1s cubic-bezier(0.42, 0, 1, 1)', style({ opacity: 0 }))])
]);
